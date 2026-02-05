import prisma from '../client';
export class DealRepository {
    async create(data) {
        return prisma.deal.create({ data });
    }
    async findById(id) {
        return prisma.deal.findUnique({ where: { id } });
    }
    async updateStage(id, stage) {
        return prisma.deal.update({ where: { id }, data: { stage } });
    }
    async findByOwner(ownerId) {
        return prisma.deal.findMany({ where: { ownerId } });
    }
}
