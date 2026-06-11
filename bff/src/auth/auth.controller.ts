import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const token = await this.authService.login(data.email, data.password);
    if (!token) {
      return { error: 'Invalid credentials' };
    }
    return { token: token };
  }

  @Post('validate-token')
  async validateToken(@Body() data: ValidateTokenDto) {
    return await this.authService.validateToken(data.jwt_token);
  }
}
