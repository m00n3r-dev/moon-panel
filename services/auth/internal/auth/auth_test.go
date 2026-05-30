package auth

import (
	"testing"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func TestHashPassword(t *testing.T) {
	hash, err := HashPassword("mypassword")
	if err != nil {
		t.Fatalf("HashPassword failed: %v", err)
	}
	if hash == "" {
		t.Fatal("HashPassword returned empty string")
	}
}

func TestCheckPassword_Success(t *testing.T) {
	hash, _ := HashPassword("mypassword")

	err := CheckPassword("mypassword", hash)
	if err != nil {
		t.Fatalf("CheckPassword should succeed: %v", err)
	}
}

func TestCheckPassword_Failure(t *testing.T) {
	hash, _ := HashPassword("mypassword")

	err := CheckPassword("wrongpassword", hash)
	if err == nil {
		t.Fatal("CheckPassword should fail with wrong password")
	}
}

func TestGenerateAndValidateToken(t *testing.T) {
	secret := []byte("test-secret-key")
	userID := "user-123"
	email := "test@test.com"

	token, err := GenerateToken(userID, email, secret, JwtToken)
	if err != nil {
		t.Fatalf("GenerateToken failed: %v", err)
	}
	if token == "" {
		t.Fatal("GenerateToken returned empty string")
	}

	claims, err := ValidateToken(token, secret)
	if err != nil {
		t.Fatalf("ValidateToken failed: %v", err)
	}
	if claims.UserID != userID {
		t.Errorf("expected UserID %s, got %s", userID, claims.UserID)
	}
	if claims.Email != email {
		t.Errorf("expected Email %s, got %s", email, claims.Email)
	}
}

func TestValidateToken_Expired(t *testing.T) {
	secret := []byte("test-secret-key")

	claims := Claims{
		UserID: "user-123",
		Email:  "test@test.com",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(-1 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now().Add(-2 * time.Hour)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, _ := token.SignedString(secret)

	_, err := ValidateToken(tokenStr, secret)
	if err == nil {
		t.Fatal("ValidateToken should fail with expired token")
	}
}

func TestValidateToken_InvalidSecret(t *testing.T) {
	secret := []byte("test-secret-key")
	wrongSecret := []byte("wrong-secret-key")

	token, _ := GenerateToken("user-123", "test@test.com", secret, JwtToken)

	_, err := ValidateToken(token, wrongSecret)
	if err == nil {
		t.Fatal("ValidateToken should fail with wrong secret")
	}
}

func TestValidateToken_InvalidString(t *testing.T) {
	_, err := ValidateToken("not-a-valid-token", []byte("secret"))
	if err == nil {
		t.Fatal("ValidateToken should fail with invalid token string")
	}
}

func TestRefreshTokenExpiry(t *testing.T) {
	secret := []byte("test-secret-key")

	jwtToken, _ := GenerateToken("user-123", "test@test.com", secret, JwtToken)
	refreshToken, _ := GenerateToken("user-123", "test@test.com", secret, RefreshToken)

	jwtClaims, _ := ValidateToken(jwtToken, secret)
	refreshClaims, _ := ValidateToken(refreshToken, secret)

	jwtExp := jwtClaims.ExpiresAt.Time
	refreshExp := refreshClaims.ExpiresAt.Time

	if !refreshExp.After(jwtExp) {
		t.Error("refresh token should expire after jwt token")
	}
}
