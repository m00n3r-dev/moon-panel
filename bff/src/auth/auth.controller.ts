import { Body, Controller, Post } from '@nestjs/common';
import { GrpcClient } from '../grpc/grpc.client';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly grpcClient: GrpcClient) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.grpcClient.login(body.email, body.password);  
  }

  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      first_name: string;
      last_name: string;
      password: string;
    },
  ) {
    return await this.grpcClient.register(
      body.email,
      body.first_name,
      body.last_name,
      body.password,
    );
  }

  @Post('validate-token')
  async validateToken(@Body() body: { jwt_token: string }) {
    return await this.grpcClient.validateToken(body.jwt_token);
  }
}
