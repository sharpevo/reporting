package main

import (
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

var rootPath *string

func main() {
	rootPath = flag.String("path", "/data", "root path of files")
	port := flag.String("port", "5000", "server port")
	flag.Parse()
	http.HandleFunc("/files/", handleFileDownload)
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
