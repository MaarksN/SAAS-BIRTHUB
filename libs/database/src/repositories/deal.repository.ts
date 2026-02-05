import prisma from '../client';
import { Deal } from '@prisma/client';

export class DealRepository {
  async create(data: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> {
    return prisma.deal.create({ data } as any);
  }

  async findById(id: string): Promise<Deal | null> {
    return prisma.deal.findUnique({ where: { id } });
  }

  async updateStage(id: string, stage: string): Promise<Deal> {
    return prisma.deal.update({ where: { id }, data: { stage } });
  }

  async findByOwner(ownerId: string): Promise<Deal[]> {
    return prisma.deal.findMany({ where: { ownerId } });
  }
}
