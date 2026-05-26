import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { CreateNasabahSchema } from './nasabah.schema';
import { nasabahService } from './nasabah.service';
import { any } from 'zod';

export const nasabahController = {
  async create(req: Request, res: Response) {
    const parsed = CreateNasabahSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        details: parsed.error.flatten().fieldErrors,
      });
    }

    try {
      const nasabah = await nasabahService.create(parsed.data);
      return res.status(201).json(nasabah);
    } catch (err) {
      // P2002 = Prisma unique constraint violation
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        const field = (err.meta?.target as string[])?.[0] ?? 'field';
        return res.status(409).json({
          error: 'DUPLICATE_ENTRY',
          message: `${field} sudah terdaftar`,
        });
      }
      throw err;
    }
  },

  async findAll(req: Request, res: Response) {
    const data = await nasabahService.findAll();
    return res.status(200).json({
      data,
      total: data.length,
    });
  },
};
