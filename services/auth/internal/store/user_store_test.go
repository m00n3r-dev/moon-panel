package store

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/moon-panel/auth/internal/model"
)

func connectDB(t *testing.T) *sqlx.DB {
	t.Helper()

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		t.Skip("DATABASE_URL not set, skipping store tests")
	}

	db, err := sqlx.Connect("postgres", dsn)
	if err != nil {
		t.Fatalf("failed to connect to database: %v", err)
	}
	t.Cleanup(func() { db.Close() })
	return db
}

func migrate(t *testing.T, db *sqlx.DB) {
	t.Helper()

	schema := `
	CREATE TABLE IF NOT EXISTS users (
		id            TEXT PRIMARY KEY,
		email         TEXT UNIQUE NOT NULL,
		first_name    TEXT NOT NULL DEFAULT '',
		last_name     TEXT NOT NULL DEFAULT '',
		password_hash TEXT NOT NULL,
		role          INTEGER NOT NULL DEFAULT 1,
		created_at    TIMESTAMP NOT NULL DEFAULT NOW()
	);`
	_, err := db.Exec(schema)
	if err != nil {
		t.Fatalf("migration failed: %v", err)
	}
}

func cleanTable(t *testing.T, db *sqlx.DB) {
	t.Helper()
	_, err := db.Exec("DELETE FROM users")
	if err != nil {
		t.Fatalf("cleanup failed: %v", err)
	}
}

func TestCreateUser(t *testing.T) {
	db := connectDB(t)
	migrate(t, db)
	cleanTable(t, db)

	s := NewUserStore(db)

	user := &model.User{
		ID:           uuid.NewString(),
		Email:        "create@test.com",
		FirstName:    "John",
		LastName:     "Doe",
		PasswordHash: "hashedpassword",
		Role:         1,
		CreatedAt:    time.Now(),
	}

	err := s.Create(context.Background(), user)
	if err != nil {
		t.Fatalf("Create failed: %v", err)
	}
}

func TestCreateUser_DuplicateEmail(t *testing.T) {
	db := connectDB(t)
	migrate(t, db)
	cleanTable(t, db)

	s := NewUserStore(db)
	email := "duplicate@test.com"

	user1 := &model.User{
		ID:           uuid.NewString(),
		Email:        email,
		FirstName:    "John",
		LastName:     "Doe",
		PasswordHash: "hash1",
		Role:         1,
		CreatedAt:    time.Now(),
	}
	err := s.Create(context.Background(), user1)
	if err != nil {
		t.Fatalf("first create failed: %v", err)
	}

	user2 := &model.User{
		ID:           uuid.NewString(),
		Email:        email,
		FirstName:    "Jane",
		LastName:     "Smith",
		PasswordHash: "hash2",
		Role:         1,
		CreatedAt:    time.Now(),
	}
	err = s.Create(context.Background(), user2)
	if err == nil {
		t.Fatal("expected duplicate email error, got nil")
	}
}

func TestGetByEmail(t *testing.T) {
	db := connectDB(t)
	migrate(t, db)
	cleanTable(t, db)

	s := NewUserStore(db)
	email := "getbyemail@test.com"

	original := &model.User{
		ID:           uuid.NewString(),
		Email:        email,
		FirstName:    "Alice",
		LastName:     "Johnson",
		PasswordHash: "hash123",
		Role:         1,
		CreatedAt:    time.Now(),
	}
	s.Create(context.Background(), original)

	found, err := s.GetByEmail(context.Background(), email)
	if err != nil {
		t.Fatalf("GetByEmail failed: %v", err)
	}
	if found.Email != email {
		t.Errorf("expected email %s, got %s", email, found.Email)
	}
	if found.FirstName != original.FirstName {
		t.Errorf("expected FirstName %s, got %s", original.FirstName, found.FirstName)
	}
}

func TestGetByEmail_NotFound(t *testing.T) {
	db := connectDB(t)
	migrate(t, db)
	cleanTable(t, db)

	s := NewUserStore(db)

	_, err := s.GetByEmail(context.Background(), "nonexistent@test.com")
	if err == nil {
		t.Fatal("expected error for nonexistent email, got nil")
	}
}

func TestGetByID(t *testing.T) {
	db := connectDB(t)
	migrate(t, db)
	cleanTable(t, db)

	s := NewUserStore(db)

	original := &model.User{
		ID:           uuid.NewString(),
		Email:        "getbyid@test.com",
		FirstName:    "Bob",
		LastName:     "Williams",
		PasswordHash: "hash456",
		Role:         2,
		CreatedAt:    time.Now(),
	}
	s.Create(context.Background(), original)

	found, err := s.GetByID(context.Background(), original.ID)
	if err != nil {
		t.Fatalf("GetByID failed: %v", err)
	}
	if found.ID != original.ID {
		t.Errorf("expected ID %s, got %s", original.ID, found.ID)
	}
	if found.Role != original.Role {
		t.Errorf("expected Role %d, got %d", original.Role, found.Role)
	}
}

func TestGetByID_NotFound(t *testing.T) {
	db := connectDB(t)
	migrate(t, db)
	cleanTable(t, db)

	s := NewUserStore(db)

	_, err := s.GetByID(context.Background(), "nonexistent-id")
	if err == nil {
		t.Fatal("expected error for nonexistent id, got nil")
	}
}
