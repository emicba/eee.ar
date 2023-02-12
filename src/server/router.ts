import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from './trpc';

const urlSchema = z.object({
  slug: z.string().trim().min(1),
  url: z.string().url().min(1).max(2000).trim(),
});

export const appRouter = router({
  createUrl: procedure.input(urlSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.prisma.url.create({ data: input });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Slug already in use 🐛',
          });
        }
      }
      throw err;
    }
  }),
});

export type AppRouter = typeof appRouter;
