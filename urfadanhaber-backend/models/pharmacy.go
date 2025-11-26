package models

import "time"

type Pharmacy struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name"`
	Address   string    `json:"address"`
	Phone     string    `json:"phone"`
	District  string    `json:"dist"` // API'den "dist" olarak geliyor
	Date      string    `json:"date"` // Hangi tarihin nöbetçisi (YYYY-MM-DD)
	CreatedAt time.Time `json:"created_at"`
}
