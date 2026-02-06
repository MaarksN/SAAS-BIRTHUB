import prisma from '../client';
import { SocialPost } from '@prisma/client';

export class SocialRepository {
  async create(data: Omit<SocialPost, 'id' | 'createdAt'>): Promise<SocialPost> {
    return prisma.socialPost.create({ data } as any);
  }
}
