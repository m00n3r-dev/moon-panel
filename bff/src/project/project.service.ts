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

  async findAllPaginated(params: { page: number; limit: number; search?: string; status?: string }) {
    const { page, limit, search, status } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { domain: { contains: search, mode: 'insensitive' as const } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
      this.prisma.project.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
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
