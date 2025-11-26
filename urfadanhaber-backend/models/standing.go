package models

import "time"

type Standing struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Rank         int       `json:"rank"`
	Team         string    `json:"team"`
	Played       int       `json:"played"`
	Win          int       `json:"win"`
	Draw         int       `json:"draw"`
	Lose         int       `json:"lose"`
	GoalsFor     int       `json:"goals_for"`
	GoalsAgainst int       `json:"goals_against"`
	GoalDiff     int       `json:"goal_diff"`
	Points       int       `json:"points"`
	League       string    `json:"league"`
	UpdatedAt    time.Time `json:"updated_at"`
}
