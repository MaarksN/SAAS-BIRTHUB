import prisma from '../client';
import { Product } from '@prisma/client';

export class ProductRepository {
  async create(data: any): Promise<Product> {
    return prisma.product.create({ data });
  }
}
