package server

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/moon-panel/auth/internal/auth"
	"github.com/moon-panel/auth/internal/model"
	"github.com/moon-panel/auth/internal/store"
	pb "github.com/moon-panel/auth/proto/auth/v1"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type authServer struct {
	pb.UnimplementedAuthServiceServer
	userStore *store.UserStore
	jwtSecret []byte
}

func NewAuthServer(userStore *store.UserStore, jwtSecret []byte) pb.AuthServiceServer {
	return &authServer{
		userStore: userStore,
		jwtSecret: jwtSecret,
	}
}

func (server *authServer) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {
	user, err := server.userStore.GetByEmail(ctx, req.Email)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "user not found")
	}

	err = auth.CheckPassword(req.Password, user.PasswordHash)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "invalid credentials")
	}

	jwtToken, err := auth.GenerateToken(user.ID, user.Email, server.jwtSecret, auth.JwtToken)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to generate token")
	}

	refreshToken, err := auth.GenerateToken(user.ID, user.Email, server.jwtSecret, auth.RefreshToken)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to generate refresh token")
	}

	return &pb.LoginResponse{
		JwtToken:     jwtToken,
		RefreshToken: refreshToken,
	}, nil
}

func (server *authServer) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.RegisterResponse, error) {
	passwordHash, err := auth.HashPassword(req.Password)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to hash the password")
	}

	user := &model.User{
		ID:           uuid.NewString(),
		Email:        req.Email,
		FirstName:    req.FirstName,
		LastName:     req.LastName,
		PasswordHash: passwordHash,
		Role:         1, // change this later
		CreatedAt:    time.Now(),
	}

	err = server.userStore.Create(ctx, user)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to create the user")
	}

	return &pb.RegisterResponse{
		UserId: user.ID,
	}, nil
}

func (server *authServer) ValidateToken(ctx context.Context, req *pb.ValidateTokenRequest) (*pb.ValidateTokenResponse, error) {
	claims, err := auth.ValidateToken(req.JwtToken, server.jwtSecret)
	if err != nil {
		return nil, status.Errorf(codes.Unauthenticated, "invalid token")
	}

	user, err := server.userStore.GetByID(ctx, claims.UserID)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to get user data")
	}

	return &pb.ValidateTokenResponse{
		UserId:    claims.UserID,
		Email:     claims.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Valid:     true,
	}, nil
}
