import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from './trpc';
import { urls } from '@/server/db/schema';
import { count, eq } from 'drizzle-orm';
import { NeonDbError } from '@neondatabase/serverless';

const urlSchema = z.object({
  slug: z.string().trim().min(1),
  url: z.string().url().min(1).max(2000).trim(),
});

export const appRouter = router({
  createUrl: procedure.input(urlSchema).mutation(async ({ input, ctx }) => {
    try {
      const [ret] = await ctx.db.insert(urls).values(input).returning();
      return ret;
    } catch (err) {
      if (err instanceof NeonDbError) {
        if (err.code === '23505') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Slug already in use 🐛',
          });
        }
      }
      throw err;
    }
  }),
  getUrl: procedure.input(z.string()).query(async ({ input, ctx }) => {
    const ret = await ctx.db.select().from(urls).where(eq(urls.slug, input)).limit(1);
    if (ret.length === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Slug not found',
      });
    }
    return ret[0];
  }),
  checkAvailability: procedure.input(z.string()).query(async ({ input, ctx }) => {
    const [ret] = await ctx.db.select({ count: count() }).from(urls).where(eq(urls.slug, input));
    return {
      isAvailable: ret.count === 0,
    };
  }),
});

export type AppRouter = typeof appRouter;
