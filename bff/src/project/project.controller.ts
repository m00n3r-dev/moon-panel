import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateProjectDto } from './dto/CreateProjectDto';
import { ProjectService } from './project.service';
import type { Response } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  async createProject(@Body() data: CreateProjectDto, @Res() res: Response) {
    const project = await this.projectService.create(data);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'project created successfully', id: project.id });
  }
}
