package models

import "time"

type PrayerTime struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Vakit     string    `json:"vakit"`
	Saat      string    `json:"saat"`
	City      string    `json:"city"`
	UpdatedAt time.Time `json:"updated_at"`
}
