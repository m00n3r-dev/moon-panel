import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Project } from '../generated/prisma/client';
import { PrismaService } from '../lib/PrismaService';
import { CreateProjectDto } from './dto/CreateProjectDto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(data: CreateProjectDto): Promise<Project> {
    return await this.prisma.project.create({
      data: {
        id: randomUUID(),
        name: data.name,
        type: data.type,
        version: data.version,
        url: data.url,
      },
    });
  }
}
