package models

import (
	"time"

	"gorm.io/gorm"
)

// NewsArticle represents a news article with SEO-friendly fields.
type NewsArticle struct {
	gorm.Model
	Headline            string    `json:"headline"`
	Description         string    `json:"description"`
	Author              string    `json:"author"`
	DatePublished       time.Time `json:"datePublished"`
	DateModified        time.Time `json:"dateModified"`
	Image               string    `json:"image"`
	Publisher           string    `json:"publisher"`
	IsAccessibleForFree bool      `json:"isAccessibleForFree"`
	Content             string    `json:"content"`
	Category            string    `json:"category"` // e.g., "dunya", "ekonomi"
	Slug                string    `json:"slug" gorm:"uniqueIndex"`
}
