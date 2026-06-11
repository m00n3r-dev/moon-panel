import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto, @Res() res: Response) {
    console.log(data.password);

    const token = await this.authService.login(data.email, data.password);
    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
    return res.json({ jwt_token: token, refresh_token: 'not_implemented' });
  }

  @Post('validate-token')
  async validateToken(@Body() data: ValidateTokenDto) {
    return await this.authService.validateToken(data.jwt_token);
  }
}
