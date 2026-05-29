package model

import "time"

type User struct {
	ID string `json:"id"`
	Email string `json:"email"`
	FirstName string `json:"first_name"`
	LastName string `json:"last_name"`
	PasswordHash string `json:"password_hash"`
	Role uint8 `json:"role"`
	CreatedAt time.Time `json:"created_at"`
}