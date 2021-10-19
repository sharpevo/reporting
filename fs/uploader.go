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
	"strings"
)

type FileRes struct {
	Data struct {
		NewReportFile struct {
			Id string `json:"id"`
		} `json:"newReportfile"`
	} `json:"data"`
}

func main() {
	reportId := flag.String("id", "", "report id in database")
	fileId := flag.String("fid", "", "file id in database")
	filePath := flag.String("path", "", "report path")
	apiUrl := flag.String("api", "http://localhost:4000/api", "api url")
	flag.Parse()
	client := &http.Client{}
	if *fileId == "" {
		file, err := os.Open(*filePath)
		defer file.Close()
		if err != nil {
			log.Fatalf("file '%s' not found\n", *filePath)
		}
		var fileBuffer bytes.Buffer
		fileWriter := multipart.NewWriter(&fileBuffer)
		operationf, _ := fileWriter.CreateFormField("operations")
		io.Copy(operationf,
			strings.NewReader(`{ "query": "mutation ($file: Upload!) { newReportFile(file: $file) { id } }", "variables": { "file": null } }`))
		mapf, _ := fileWriter.CreateFormField("map")
		io.Copy(mapf,
			strings.NewReader(`{ "0": ["variables.file"] }`))
		zerof, _ := fileWriter.CreateFormFile("0", file.Name())
		io.Copy(zerof, file)
		fileWriter.Close()
		fileReq, err := http.NewRequest("POST", *apiUrl, &fileBuffer)
		if err != nil {
			log.Fatal(err)
		}
		fileReq.Header.Set("Content-Type", fileWriter.FormDataContentType())
		log.Println("uploading file...")
		res, err := client.Do(fileReq)
		if err != nil {
			log.Fatal(err)
		}
		if res.StatusCode != http.StatusOK {
			log.Fatalf("failed to upload file: %s", res.Status)
		}
		defer res.Body.Close()
		fileBody, _ := ioutil.ReadAll(res.Body)
		fileRes := FileRes{}
		if err := json.Unmarshal(fileBody, &fileRes); err != nil {
			log.Fatal("failed to parse response", err)
		}
		fileId = &fileRes.Data.NewReportFile.Id
		if *fileId == "" {
			log.Fatal("invalid file id")
		}
	}
	log.Println("updating database...")
	reportReq, err := http.NewRequest("POST", *apiUrl,
		strings.NewReader(fmt.Sprintf(`{"query": "mutation ($id: String!, $file: String!){updateReportReportFile(id: $id, file: $file){id}}", "variables":{"id":"%s", "file":"%s"}}`, *reportId, *fileId)))
	reportReq.Header.Set("Content-Type", "application/json")
	reportRes, err := client.Do(reportReq)
	if err != nil {
		log.Fatal(err)
	}
	defer reportRes.Body.Close()
	reportBody, _ := ioutil.ReadAll(reportRes.Body)
	if reportRes.StatusCode != http.StatusOK {
		log.Fatalf("failed to update database: %s %s", reportRes.Status, string(reportBody))
	}
	log.Println("done")
}
