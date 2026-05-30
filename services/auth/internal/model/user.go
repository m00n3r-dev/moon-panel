package model

import "time"

type User struct {
	ID           string    `db:"id" json:"id"`
	Email        string    `db:"email" json:"email"`
	FirstName    string    `db:"first_name" json:"first_name"`
	LastName     string    `db:"last_name" json:"last_name"`
	PasswordHash string    `db:"password_hash" json:"password_hash"`
	Role         uint8     `db:"role" json:"role"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
}
