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

const (
	CollectAPIKey = "apikey 1uaEvDchgm4jgEN1xjr4fW:5oyj6GgvC0gRUArsqwXE8h"
	City          = "Sanliurfa"
)

type CollectAPIResponse struct {
	Success bool              `json:"success"`
	Result  []models.Pharmacy `json:"result"`
}

func GetPharmacies(c *gin.Context, db *gorm.DB) {
	today := time.Now().Format("2006-01-02")

	// 1. Veritabanını kontrol et
	var pharmacies []models.Pharmacy
	result := db.Where("date = ?", today).Find(&pharmacies)

	// Eğer veritabanında bugünün verisi varsa ve boş değilse, onu döndür
	if result.Error == nil && len(pharmacies) > 0 {
		c.JSON(http.StatusOK, pharmacies)
		return
	}

	// 2. Veritabanında yoksa API'den çek
	url := fmt.Sprintf("https://api.collectapi.com/health/dutyPharmacy?il=%s", City)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Request creation failed"})
		return
	}

	req.Header.Add("content-type", "application/json")
	req.Header.Add("authorization", CollectAPIKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "API request failed"})
		return
	}
	defer resp.Body.Close()

	var apiResponse CollectAPIResponse
	if err := json.NewDecoder(resp.Body).Decode(&apiResponse); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "JSON decode failed"})
		return
	}

	if !apiResponse.Success {
		c.JSON(http.StatusBadGateway, gin.H{"error": "CollectAPI returned failure"})
		return
	}

	// 3. Veriyi veritabanına kaydet
	for i := range apiResponse.Result {
		apiResponse.Result[i].Date = today
		// ID'yi sıfırla ki GORM yeni kayıt olarak algılasın (API'den ID gelmiyor ama ne olur ne olmaz)
		apiResponse.Result[i].ID = 0
	}

	if err := db.Create(&apiResponse.Result).Error; err != nil {
		// Kayıt hatası olsa bile kullanıcıya veriyi dönelim, sadece loglayalım
		fmt.Printf("Database save error: %v\n", err)
	}

	c.JSON(http.StatusOK, apiResponse.Result)
}
