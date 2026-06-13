import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { CreateProjectDto } from './dto/CreateProjectDto';
import { ProjectService } from './project.service';
import type { Response } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get('list')
  async listProjects(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.projectService.findAllPaginated({
      page: Math.max(1, parseInt(page ?? '1', 10)),
      limit: Math.min(100, Math.max(1, parseInt(limit ?? '12', 10))),
      search,
      status: status && status !== 'all' ? status : undefined,
    });
  }

  @Get(':id')
  getProject(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Post('create')
  async createProject(@Body() data: CreateProjectDto, @Res() res: Response) {
    const project = await this.projectService.create(data);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'project created successfully', id: project.id });
  }
}
