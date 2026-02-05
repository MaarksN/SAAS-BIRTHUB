import prisma from '../client';
export class LeadRepository {
    async create(data) {
        return prisma.lead.create({ data });
    }
    async findById(id) {
        return prisma.lead.findUnique({ where: { id } });
    }
    async update(id, data) {
        return prisma.lead.update({ where: { id }, data });
    }
    async findByEmail(email) {
        return prisma.lead.findFirst({ where: { email } });
    }
}
