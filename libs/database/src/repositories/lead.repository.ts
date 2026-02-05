import prisma from '../client';
import { Lead } from '@prisma/client';

export class LeadRepository {
  async create(data: Partial<Lead>): Promise<Lead> {
    return prisma.lead.create({ data } as any);
  }

  async findById(id: string): Promise<Lead | null> {
    return prisma.lead.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Lead>): Promise<Lead> {
    return prisma.lead.update({ where: { id }, data } as any);
  }

  async findByEmail(email: string): Promise<Lead | null> {
    return prisma.lead.findFirst({ where: { email } });
  }
}
