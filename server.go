// Cats Api
package main

// Import packages
import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

// Main function loaded
func main() {
	// Serve on route /api
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		// Read file
		fileContent, err := os.Open("catdata.json")

		if err != nil {
			log.Fatal(err)
			return
		}

		fmt.Println("The File is opened successfully...")

		defer fileContent.Close()

		byteResult, _ := ioutil.ReadAll(fileContent)

		var res map[string]interface{}
		json.Unmarshal([]byte(byteResult), &res)

		fmt.Println(res["cats"])
		catData, err := json.Marshal(res["cats"])
		if err != nil {
			log.Fatal(err)
		}
		// Had use these headers because of cors restrictions in dev env. We would not use * in production for safety reasons.
		(w).Header().Set("Access-Control-Allow-Origin", "*")
		(w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		(w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		// Response data
		w.Write(catData)
	})

	fmt.Printf("Starting server at port 8080\n")

	// Serve
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}

}
