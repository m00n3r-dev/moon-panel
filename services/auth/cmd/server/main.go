package main

import (
	"log"
	"net"
	"os"

	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/moon-panel/auth/internal/server"
	"github.com/moon-panel/auth/internal/store"
	pb "github.com/moon-panel/auth/proto/auth/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	godotenv.Load()

	dbUrl := os.Getenv("DATABASE_URL")
	jwtSecret := os.Getenv("JWT_SECRET")
	port := os.Getenv("GRPC_PORT")
	if port == "" {
		port = "50051"
	}

	db, err := sqlx.Connect("postgres", dbUrl)
	if err != nil {
		log.Fatalf("database connection failed: %v", err)
	}

	userStore := store.NewUserStore(db)
	authServer := server.NewAuthServer(userStore, []byte(jwtSecret))

	lis, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.Fatalf("net listen failed: %v", err)
	}
	grpcServer := grpc.NewServer()
	pb.RegisterAuthServiceServer(grpcServer, authServer)
	log.Printf("Auth Service running (:%s)",port)
	reflection.Register(grpcServer)
	grpcServer.Serve(lis)
}
