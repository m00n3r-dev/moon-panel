import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Project } from '../generated/prisma/client';
import { PrismaService } from '../lib/PrismaService';
import { CreateProjectDto } from './dto/CreateProjectDto';

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(data: CreateProjectDto): Promise<Project> {
    const nameExists = await this.prisma.project.findFirst({
      where: { name: data.name },
    });
    if (nameExists) {
      throw new ConflictException('Project name already exists!');
    }

    const urlExists = await this.prisma.project.findFirst({
      where: { url: data.url },
    });
    if (urlExists) {
      throw new ConflictException('Project url already exists!');
    }

    return await this.prisma.project.create({
      data: {
        id: randomUUID(),
        name: data.name,
        type: data.type,
        version: data.version,
        url: data.url,
        domain: data.url ? extractDomain(data.url) : '',
        status: 'live',
        cpu: data.cpu ?? 0,
        memory: data.memory ?? 0,
        storage: data.storage ?? 0,
      },
    });
  }
}
