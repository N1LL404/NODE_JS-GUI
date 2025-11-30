package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime"
	"time"
)

// Response structures
type StatusResponse struct {
	Status    string    `json:"status"`
	Message   string    `json:"message"`
	Timestamp time.Time `json:"timestamp"`
}

type SystemInfoResponse struct {
	OS           string `json:"os"`
	Architecture string `json:"architecture"`
	CPUs         int    `json:"cpus"`
	GoVersion    string `json:"goVersion"`
}

type ComputationResponse struct {
	Input  int   `json:"input"`
	Result int64 `json:"result"`
	Time   int64 `json:"timeMs"`
}

// CORS middleware
func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

// Health check endpoint
func healthHandler(w http.ResponseWriter, r *http.Request) {
	response := StatusResponse{
		Status:    "ok",
		Message:   "Go server is running!",
		Timestamp: time.Now(),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// System information endpoint
func systemInfoHandler(w http.ResponseWriter, r *http.Request) {
	info := SystemInfoResponse{
		OS:           runtime.GOOS,
		Architecture: runtime.GOARCH,
		CPUs:         runtime.NumCPU(),
		GoVersion:    runtime.Version(),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(info)
}

// Heavy computation example (Fibonacci)
func fibonacci(n int) int64 {
	if n <= 1 {
		return int64(n)
	}
	return fibonacci(n-1) + fibonacci(n-2)
}

// Computation endpoint
func computeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var request struct {
		Number int `json:"number"`
	}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Limit to prevent hanging
	if request.Number < 0 || request.Number > 45 {
		http.Error(w, "Number must be between 0 and 45", http.StatusBadRequest)
		return
	}

	start := time.Now()
	result := fibonacci(request.Number)
	elapsed := time.Since(start).Milliseconds()

	response := ComputationResponse{
		Input:  request.Number,
		Result: result,
		Time:   elapsed,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// File operations endpoint
func filesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		// List files in current directory
		files, err := os.ReadDir(".")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var fileList []map[string]interface{}
		for _, file := range files {
			info, _ := file.Info()
			fileList = append(fileList, map[string]interface{}{
				"name":    file.Name(),
				"isDir":   file.IsDir(),
				"size":    info.Size(),
				"modTime": info.ModTime(),
			})
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(fileList)

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// Greeting endpoint with parameters
func greetHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "World"
	}

	response := map[string]string{
		"greeting": fmt.Sprintf("Hello, %s! from Go backend 🚀", name),
		"time":     time.Now().Format(time.RFC3339),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Register routes
	http.HandleFunc("/health", enableCORS(healthHandler))
	http.HandleFunc("/system", enableCORS(systemInfoHandler))
	http.HandleFunc("/compute", enableCORS(computeHandler))
	http.HandleFunc("/files", enableCORS(filesHandler))
	http.HandleFunc("/greet", enableCORS(greetHandler))

	// Start server
	address := fmt.Sprintf("localhost:%s", port)
	log.Printf("🚀 Go server starting on http://%s", address)
	log.Printf("📡 Endpoints:")
	log.Printf("   GET  /health  - Health check")
	log.Printf("   GET  /system  - System information")
	log.Printf("   POST /compute - Fibonacci computation")
	log.Printf("   GET  /files   - List files")
	log.Printf("   GET  /greet   - Greeting message")

	if err := http.ListenAndServe(address, nil); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}

