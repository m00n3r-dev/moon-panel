package store

import (
	"context"

	"github.com/jmoiron/sqlx"
	"github.com/moon-panel/auth/internal/model"
)

type UserStore struct {
	db *sqlx.DB
}

func NewUserStore(db *sqlx.DB) *UserStore {
	return &UserStore{db: db}
}

func (s *UserStore) Create(ctx context.Context, user *model.User) error {
	query := `INSERT INTO users (id, email, first_name, last_name, password_hash, role, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`
	_, err := s.db.ExecContext(ctx, query, user.ID, user.Email, user.FirstName, user.LastName, user.PasswordHash, user.Role, user.CreatedAt)
	return err
}

func (s *UserStore) GetByEmail(ctx context.Context, email string) (*model.User, error) {
	var user model.User
	err := s.db.GetContext(ctx, &user, "SELECT * FROM users WHERE email = $1", email)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *UserStore) GetByID(ctx context.Context, id string) (*model.User, error) {
	var user model.User
	err := s.db.GetContext(ctx, &user, "SELECT * FROM users WHERE id = $1", id)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
