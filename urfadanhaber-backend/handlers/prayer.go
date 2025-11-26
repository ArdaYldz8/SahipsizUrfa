package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"urfadanhaber-backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CollectAPIPrayerResponse struct {
	Success bool `json:"success"`
	Result  []struct {
		Vakit string `json:"vakit"`
		Saat  string `json:"saat"`
	} `json:"result"`
}

func GetPrayerTimes(c *gin.Context, db *gorm.DB) {
	city := c.DefaultQuery("city", "sanliurfa")
	var prayerTimes []models.PrayerTime
	today := time.Now().Format("2006-01-02")

	// Check cache for today
	db.Where("date(updated_at) = ? AND city = ?", today, city).Order("id asc").Find(&prayerTimes)

	if len(prayerTimes) > 0 {
		c.JSON(http.StatusOK, prayerTimes)
		return
	}

	// Fetch from API
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://api.collectapi.com/pray/all?city="+city, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	req.Header.Add("content-type", "application/json")
	req.Header.Add("authorization", "apikey 1uaEvDchgm4jgEN1xjr4fW:5oyj6GgvC0gRUArsqwXE8h")

	res, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch data"})
		return
	}
	defer res.Body.Close()

	var apiRes CollectAPIPrayerResponse
	if err := json.NewDecoder(res.Body).Decode(&apiRes); err != nil {
		fmt.Println("Failed to parse prayer data:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse data"})
		return
	}

	if !apiRes.Success || len(apiRes.Result) == 0 {
		c.JSON(http.StatusOK, []models.PrayerTime{})
		return
	}

	// Save to DB
	var newPrayerTimes []models.PrayerTime
	for _, item := range apiRes.Result {
		prayerTime := models.PrayerTime{
			Vakit:     item.Vakit,
			Saat:      item.Saat,
			City:      city,
			UpdatedAt: time.Now(),
		}
		db.Create(&prayerTime)
		newPrayerTimes = append(newPrayerTimes, prayerTime)
	}

	c.JSON(http.StatusOK, newPrayerTimes)
}
