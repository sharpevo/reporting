package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var rootPath *string
var apiUrl *string

func main() {
	rootPath = flag.String("path", "/data", "root path of files")
	port := flag.String("port", "5000", "server port")
	apiUrl := flag.String("api", "http://localhost:4000/api", "api url")
	binDir := flag.String("bin", "bin/", "bin directori")
	flag.Parse()
	http.HandleFunc("/files/", handleFileDownload)
	go watchReportFiles(*apiUrl, *binDir)
	fmt.Printf("serving at %s\n", *port)
	err := http.ListenAndServe(fmt.Sprintf(":%s", *port), nil)
	if err != nil {
		fmt.Println(err)
	}
}

func handleFileDownload(w http.ResponseWriter, r *http.Request) {
	filePath, err := filepath.Rel("/files/", r.URL.Path)
	if err != nil {
		http.Error(w, fmt.Sprintf("invalid path %s", filePath), 400)
		return
	}
	fileName := r.URL.Query().Get("name")
	if fileName == "" {
		http.Error(w, "name is requried", 400)
		return
	}
	fmt.Printf("request: '%s' at '%s'\n", fileName, filePath)

	f, err := os.Open(filepath.Join(*rootPath, filePath))
	defer f.Close()
	if err != nil {
		http.Error(w, fmt.Sprintf("file '%s' not found", fileName), 404)
		return
	}

	fileHeader := make([]byte, 512)
	f.Read(fileHeader)
	fileContentType := http.DetectContentType(fileHeader)

	fileStat, _ := f.Stat()
	fileSize := strconv.FormatInt(fileStat.Size(), 10)

	if !strings.HasPrefix(fileContentType, "image/") {
		w.Header().Set("Content-Disposition", "attachment; filename="+fileName)
	}
	w.Header().Set("Content-Type", fileContentType)
	w.Header().Set("Content-Length", fileSize)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	f.Seek(0, 0)
	io.Copy(w, f)
	return
}

func watchReportFiles(apiUrl string, binDir string) {
	for {
		err := processReportFiles(apiUrl, binDir)
		if err != nil {
			log.Println(err)
		}
		time.Sleep(5 * time.Second)
	}
}

func processReportFiles(apiUrl string, binDir string) error {
	tmpPath := filepath.Join(filepath.Dir(*rootPath), "tmp")
	files, err := ioutil.ReadDir(tmpPath)
	if err != nil {
		return err
	}
	for _, f := range files {
		log.Println("> checking", f.Name())
		taskId, err := getTaskId(f.Name())
		if err != nil {
			log.Println(err)
			continue
		}
		tmpFilePath := filepath.Join(tmpPath, f.Name())
		errMsg := ""
		outputPath, err := generateReport(tmpFilePath, binDir)
		if err != nil {
			log.Println(err)
			errMsg = err.Error()
			//continue
		}
		outputPath = fmt.Sprintf("%s.tex", outputPath)
		log.Println("updating task", outputPath, taskId, errMsg)
		if err := updateTask(outputPath, taskId, errMsg, apiUrl); err != nil {
			log.Println(err)
		} else {
			os.RemoveAll(filepath.Dir(outputPath))
			os.Remove(tmpFilePath)
		}
	}
	return nil
}

var RE_TASK_ID = regexp.MustCompile("(?P<id>^[\\w]{24})_(?P<uuid>[\\w]{8}-[\\w]{4}-[\\w]{4}-[\\w]{4}-[\\w]{12})")

func getTaskId(fileName string) (string, error) {
	matches := RE_TASK_ID.FindStringSubmatch(fileName)
	if len(matches) == 0 {
		return "", fmt.Errorf("invalid file name: %s", fileName)
	}
	return matches[1], nil
}

func generateReport(filePath string, binDir string) (string, error) {
	outputDir, err := os.MkdirTemp("", "fs")
	if err != nil {
		return "", err
	}
	if err := copyDirectory(binDir, outputDir); err != nil {
		return "", err
	}
	fileName := filepath.Base(filePath)
	expectedFilePath := filepath.Join(
		outputDir,
		fileName,
	)
	if err := copyFile(filePath, expectedFilePath); err != nil {
		return "", err
	}
	cmd := exec.Command(
		"perl",
		//filepath.Join(outputDir, "make_tex.pl"),
		"make_tex.pl",
		"-j",
		//filePath,
		fileName,
		"-n",
		fileName,
		"-o",
		outputDir,
	)
	cmd.Dir = outputDir
	log.Println("run command", cmd.Path, cmd.Args)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return expectedFilePath, fmt.Errorf("%s: %s", err, output)
	}
	log.Println(string(output))
	return expectedFilePath, nil
}

type FileRes struct {
	Data struct {
		NewReportFile struct {
			Id string `json:"id"`
		} `json:"newReportfile"`
	} `json:"data"`
}

func updateTask(outputPath, taskId, errMsg, apiUrl string) error {
	client := &http.Client{}

	file, err := os.Open(outputPath)
	defer file.Close()
	if err != nil {
		return err
	}
	var fileBuffer bytes.Buffer
	fileWriter := multipart.NewWriter(&fileBuffer)
	operationf, _ := fileWriter.CreateFormField("operations")
	io.Copy(operationf,
		strings.NewReader(fmt.Sprintf(`{ "query": "mutation ($file: Upload!, $taskId: String!, $errMsg: String) { addReportFileToReportTask(file: $file, taskId: $taskId, errMsg: $errMsg) }", "variables": { "file": null, "taskId": "%s", "errMsg": "%s"} }`, taskId, errMsg)))
	mapf, _ := fileWriter.CreateFormField("map")
	io.Copy(mapf,
		strings.NewReader(`{ "0": ["variables.file"] }`))
	zerof, _ := fileWriter.CreateFormFile("0", file.Name())
	io.Copy(zerof, file)
	fileWriter.Close()
	fileReq, err := http.NewRequest("POST", apiUrl, &fileBuffer)
	if err != nil {
		return err
	}
	fileReq.Header.Set("Content-Type", fileWriter.FormDataContentType())
	log.Println("uploading file...")
	res, err := client.Do(fileReq)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	fileBody, _ := ioutil.ReadAll(res.Body)
	log.Println(string(fileBody))
	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to upload file: %s", res.Status)
	}
	fileRes := FileRes{}
	if err := json.Unmarshal(fileBody, &fileRes); err != nil {
		return fmt.Errorf("failed to parse response: %s", err)
	}
	log.Println(fileRes)
	return nil
}

func copyDirectory(src, dst string) error {
	log.Println("copying", src, dst)
	entries, err := ioutil.ReadDir(src)
	if err != nil {
		return err
	}
	for _, entry := range entries {
		sourcePath := filepath.Join(src, entry.Name())
		destPath := filepath.Join(dst, entry.Name())

		fileInfo, err := os.Stat(sourcePath)
		if err != nil {
			return err
		}

		switch fileInfo.Mode() & os.ModeType {
		case os.ModeDir:
			if err := createDir(destPath, 0755); err != nil {
				return err
			}
			if err := copyDirectory(sourcePath, destPath); err != nil {
				return err
			}
		case os.ModeSymlink:
			if err := copySymLink(sourcePath, destPath); err != nil {
				return err
			}
		default:
			if err := copyFile(sourcePath, destPath); err != nil {
				return err
			}
		}

		isSymlink := entry.Mode()&os.ModeSymlink != 0
		if !isSymlink {
			if err := os.Chmod(destPath, entry.Mode()); err != nil {
				return err
			}
		}
	}
	return nil
}

func copyFile(src, dst string) error {
	sourceFileStat, err := os.Stat(src)
	if err != nil {
		return err
	}

	if !sourceFileStat.Mode().IsRegular() {
		return fmt.Errorf("%s is not a regular file", src)
	}

	source, err := os.Open(src)
	if err != nil {
		return err
	}
	defer source.Close()

	destination, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer destination.Close()
	_, err = io.Copy(destination, source)
	return err
}

func exists(path string) bool {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		return false
	}

	return true
}

func createDir(dir string, perm os.FileMode) error {
	if exists(dir) {
		return nil
	}

	if err := os.MkdirAll(dir, perm); err != nil {
		return fmt.Errorf("failed to create directory: '%s', error: '%s'", dir, err.Error())
	}

	return nil
}

func copySymLink(src, dst string) error {
	link, err := os.Readlink(src)
	if err != nil {
		return err
	}
	return os.Symlink(link, dst)
}
