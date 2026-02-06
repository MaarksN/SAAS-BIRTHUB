import prisma from '../client';
import { CallRecording } from '@prisma/client';

export class VoiceRepository {
  async create(data: Omit<CallRecording, 'id' | 'createdAt'>): Promise<CallRecording> {
    return prisma.callRecording.create({ data } as any);
  }
}
