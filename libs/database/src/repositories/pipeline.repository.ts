import prisma from '../client';
import { Pipeline } from '@prisma/client';

export class PipelineRepository {
  async create(data: any): Promise<Pipeline> {
    return prisma.pipeline.create({ data });
  }
}
