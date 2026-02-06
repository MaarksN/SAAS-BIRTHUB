import prisma from '../client';
import { IntegrationConfig } from '@prisma/client';

export class IntegrationRepository {
  async create(data: any): Promise<IntegrationConfig> {
    return prisma.integrationConfig.create({ data });
  }
}
