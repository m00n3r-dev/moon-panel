import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { Injectable } from '@nestjs/common';

const PROTO_PATH = __dirname + '/../../../proto/auth/v1/auth.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition) as any;

@Injectable()
export class GrpcClient {
  private client: any;

  constructor() {
    this.client = new proto.auth.v1.AuthService(
      'localhost:50051',
      grpc.credentials.createInsecure(),
    );
  }

  login(
    email: string,
    password: string,
  ): Promise<{ jwtToken: string; refreshToken: string }> {
    return new Promise((resolve, reject) => {
      this.client.Login({ email, password }, (err: any, res: any) => {
        if (err) return reject(err);
        resolve({ jwtToken: res.jwt_token, refreshToken: res.refresh_token });
      });
    });
  }

  register(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
  ): Promise<{ user_id: string }> {
    return new Promise((resolve, reject) => {
      this.client.Register(
        { email, first_name, last_name, password },
        (err: any, res: any) => {
          if (err) return reject(err);
          resolve({ user_id: res.user_id });
        },
      );
    });
  }

  validateToken(jwtToken: string): Promise<{
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    valid: boolean;
  }> {
    return new Promise((resolve, reject) => {
      this.client.ValidateToken({ jwtToken }, (err: any, res: any) => {
        if (err) return reject(err);
        resolve({
          user_id: res.user_id,
          email: res.email,
          first_name: res.first_name,
          last_name: res.last_name,
          valid: res.valid,
        });
      });
    });
  }
}
