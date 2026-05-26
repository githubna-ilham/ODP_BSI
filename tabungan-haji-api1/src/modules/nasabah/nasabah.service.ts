import { prisma } from '../../lib/prisma';
import type { CreateNasabahInput } from './nasabah.schema';

export const nasabahService = {
  create: (data: CreateNasabahInput) => prisma.nasabah.create({ data }),
  findAll: () => prisma.nasabah.findMany({ orderBy: { createdAt: 'desc' } }),
};
