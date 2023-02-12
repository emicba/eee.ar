import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from './trpc';

const urlSchema = z.object({
  slug: z.string().trim().min(1),
  url: z.string().url().min(1).max(2000).trim(),
});

export const appRouter = router({
  createUrl: procedure.input(urlSchema).mutation(({ input }) => {
    // TODO:
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Not implemented',
    });
  }),
});

export type AppRouter = typeof appRouter;
