package main

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"
	"urfadanhaber-backend/handlers"
	"urfadanhaber-backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/glebarez/sqlite"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var db *gorm.DB
var jwtSecret = []byte("cok-gizli-bir-anahtar-bunu-env-den-almak-lazim") // TODO: Environment variable

func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("urfadanhaber.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&models.NewsArticle{}, &models.User{}, &models.Pharmacy{}, &models.Standing{}, &models.PrayerTime{})

	// Seed data if empty
	seedData()
	seedAdminUser()

	r := GinRouter()
	r.Run(":8080") // listen and serve on 0.0.0.0:8080
}

func seedData() {
	var count int64
	db.Model(&models.NewsArticle{}).Count(&count)
	if count > 0 {
		return
	}

	mockNews := []models.NewsArticle{
		{
			Headline:            "Şanlıurfa'da Göbeklitepe Ziyaretçi Rekoru Kırdı",
			Description:         "Tarihin sıfır noktası Göbeklitepe, 2024 yılında ziyaretçi akınına uğradı.",
			Author:              "Ahmet Yılmaz",
			DatePublished:       time.Now().Add(-48 * time.Hour),
			DateModified:        time.Now().Add(-24 * time.Hour),
			Image:               "https://images.unsplash.com/photo-1599576838688-8a6c11263108?auto=format&fit=crop&q=80&w=1000",
			Publisher:           "UrfadanHaber",
			IsAccessibleForFree: true,
			Content:             "Şanlıurfa'nın simgesi haline gelen Göbeklitepe, bu yıl yerli ve yabancı turistlerin ilgi odağı oldu. Yapılan açıklamalara göre...",
			Category:            "kultur-sanat",
			Slug:                "sanliurfa-gobeklitepe-rekor",
		},
		{
			Headline:            "Yerli Biber Hasadı Başladı",
			Description:         "Şanlıurfa'nın meşhur isot biberi için hasat mevsimi açıldı.",
			Author:              "Ayşe Demir",
			DatePublished:       time.Now().Add(-2 * time.Hour),
			DateModified:        time.Now(),
			Image:               "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000",
			Publisher:           "UrfadanHaber",
			IsAccessibleForFree: true,
			Content:             "Tarladan sofraya uzanan lezzet yolculuğu başladı. Çiftçiler sabahın erken saatlerinde tarlalara inerek...",
			Category:            "ekonomi",
			Slug:                "yerli-biber-hasadi",
		},
	}

	for _, article := range mockNews {
		db.Create(&article)
	}
	fmt.Println("Mock data seeded.")
}

func seedAdminUser() {
	var count int64
	db.Model(&models.User{}).Count(&count)
	if count > 0 {
		return
	}

	password := "admin123"
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	admin := models.User{
		Username: "admin",
		Password: string(hashedPassword),
	}

	db.Create(&admin)
	fmt.Println("Admin user seeded (admin/admin123).")
}

func GinRouter() *gin.Engine {
	r := gin.Default()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	r.Use(cors.New(config))

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "UP",
		})
	})

	// Public routes
	r.GET("/api/news", GetNews)
	r.GET("/api/news/:id", GetNewsDetail)
	r.GET("/api/pharmacies", func(c *gin.Context) {
		handlers.GetPharmacies(c, db)
	})
	r.GET("/api/standings", func(c *gin.Context) {
		handlers.GetStandings(c, db)
	})
	r.GET("/api/prayer-times", func(c *gin.Context) {
		handlers.GetPrayerTimes(c, db)
	})
	r.POST("/api/login", Login)

	// Protected routes
	protected := r.Group("/api")
	protected.Use(AuthMiddleware())
	{
		protected.POST("/news", CreateNews)
		protected.PUT("/news/:id", UpdateNews)
		protected.DELETE("/news/:id", DeleteNews)
		protected.POST("/upload", UploadImage)
	}

	// Serve uploaded files
	r.Static("/uploads", "./uploads")

	return r
}

// AuthMiddleware checks for valid JWT token
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Next()
	}
}

func Login(c *gin.Context) {
	var input struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	if err := db.Where("username = ?", input.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func GetNews(c *gin.Context) {
	var news []models.NewsArticle
	result := db.Order("date_published desc").Find(&news)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	var response []map[string]interface{}
	for _, n := range news {
		response = append(response, gin.H{
			"id":                  strconv.Itoa(int(n.ID)),
			"headline":            n.Headline,
			"description":         n.Description,
			"author":              n.Author,
			"datePublished":       n.DatePublished,
			"dateModified":        n.DateModified,
			"image":               n.Image,
			"publisher":           n.Publisher,
			"isAccessibleForFree": n.IsAccessibleForFree,
			"content":             n.Content,
			"category":            n.Category,
			"slug":                n.Slug,
		})
	}

	c.JSON(http.StatusOK, response)
}

func GetNewsDetail(c *gin.Context) {
	id := c.Param("id")
	var article models.NewsArticle

	// Try to find by ID first
	if err := db.First(&article, id).Error; err != nil {
		// If not found by ID, try by Slug (since frontend might send slug in some cases or we want to support it)
		if err := db.Where("slug = ?", id).First(&article).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"message": "News not found"})
			return
		}
	}

	response := gin.H{
		"id":                  strconv.Itoa(int(article.ID)),
		"headline":            article.Headline,
		"description":         article.Description,
		"author":              article.Author,
		"datePublished":       article.DatePublished,
		"dateModified":        article.DateModified,
		"image":               article.Image,
		"publisher":           article.Publisher,
		"isAccessibleForFree": article.IsAccessibleForFree,
		"content":             article.Content,
		"category":            article.Category,
		"slug":                article.Slug,
	}

	c.JSON(http.StatusOK, response)
}

func CreateNews(c *gin.Context) {
	var article models.NewsArticle
	if err := c.ShouldBindJSON(&article); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Basic validation or defaults
	if article.DatePublished.IsZero() {
		article.DatePublished = time.Now()
	}
	article.DateModified = time.Now()

	if result := db.Create(&article); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, article)
}

func UpdateNews(c *gin.Context) {
	id := c.Param("id")
	var article models.NewsArticle

	if err := db.First(&article, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "News not found"})
		return
	}

	var input models.NewsArticle
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update fields
	article.Headline = input.Headline
	article.Description = input.Description
	article.Author = input.Author
	article.Image = input.Image
	article.Publisher = input.Publisher
	article.IsAccessibleForFree = input.IsAccessibleForFree
	article.Content = input.Content
	article.Category = input.Category
	article.Slug = input.Slug
	article.DateModified = time.Now()

	db.Save(&article)
	c.JSON(http.StatusOK, article)
}

func DeleteNews(c *gin.Context) {
	id := c.Param("id")
	var article models.NewsArticle

	if err := db.First(&article, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "News not found"})
		return
	}

	db.Delete(&article)
	c.JSON(http.StatusOK, gin.H{"message": "News deleted successfully"})
}

func UploadImage(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file uploaded"})
		return
	}

	// Generate unique filename
	filename := fmt.Sprintf("%d_%s", time.Now().UnixNano(), file.Filename)
	path := "uploads/" + filename

	if err := c.SaveUploadedFile(file, path); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	// Return the URL to the file
	// Assuming server runs on localhost:8080
	url := fmt.Sprintf("http://localhost:8080/uploads/%s", filename)
	c.JSON(http.StatusOK, gin.H{"url": url})
}
