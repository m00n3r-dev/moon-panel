import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {}
