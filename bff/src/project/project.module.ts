import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaService } from '../lib/PrismaService';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, JwtModule],
})
export class ProjectModule {}
