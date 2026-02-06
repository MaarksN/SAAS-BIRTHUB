import prisma from '../client';
import { Workflow } from '@prisma/client';

export class WorkflowRepository {
  async create(data: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>): Promise<Workflow> {
    return prisma.workflow.create({ data } as any);
  }
  async findAll(orgId: string): Promise<Workflow[]> {
    return prisma.workflow.findMany({ where: { organizationId: orgId } });
  }
}
