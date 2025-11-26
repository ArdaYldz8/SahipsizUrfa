package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"urfadanhaber-backend/models"

	"github.com/stretchr/testify/assert"
)

func TestHealthCheck(t *testing.T) {
	router := GinRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/health", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, "{\"status\":\"UP\"}", w.Body.String())
}

func TestGetNews(t *testing.T) {
	router := GinRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/news", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)

	var news []models.NewsArticle
	err := json.Unmarshal(w.Body.Bytes(), &news)
	assert.Nil(t, err)
	assert.NotEmpty(t, news)
	assert.Equal(t, "UrfadanHaber", news[0].Publisher)
}
