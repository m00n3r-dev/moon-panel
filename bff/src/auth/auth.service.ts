import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/PrismaService';
import { User } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const token = await this.jwtService.signAsync({
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });

    return token;
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return { valid: true, ...payload };
    } catch {
      return { valid: false };
    }
  }
}
