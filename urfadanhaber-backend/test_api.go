//go:build ignore

package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func main() {
	url := "https://api.collectapi.com/football/league?league=tff-1-lig"
	// url := "https://api.collectapi.com/sport/league?data.league=tff-1-lig"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("content-type", "application/json")
	req.Header.Add("authorization", "apikey 1uaEvDchgm4jgEN1xjr4fW:5oyj6GgvC0gRUArsqwXE8h")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println("Status:", res.Status)
	fmt.Println("Body:", string(body))
}
