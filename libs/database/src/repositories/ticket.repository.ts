import prisma from '../client';
import { SupportTicket } from '@prisma/client';

export class TicketRepository {
  async create(data: any): Promise<SupportTicket> {
    return prisma.supportTicket.create({ data });
  }
}
