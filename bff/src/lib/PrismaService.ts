import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { getEnv } from './envHelper';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const adapter = new PrismaPg({
      connectionString: getEnv('DATABASE_URL') as string,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    super({ adapter });
  }
}
