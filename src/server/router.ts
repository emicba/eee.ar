import { DatabaseError } from '@planetscale/database';
import { TRPCError } from '@trpc/server';
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { urls } from './db/schema';
import { procedure, router } from './trpc';

const urlSchema = z.object({
  slug: z.string().trim().min(1),
  url: z.string().url().min(1).max(2000).trim(),
});

export const appRouter = router({
  createUrl: procedure.input(urlSchema).mutation(async ({ input, ctx }) => {
    return ctx.db.transaction(async (tx) => {
      try {
        await tx.insert(urls).values(input);
      } catch (err) {
        // https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html#error_er_dup_entry
        if (err instanceof DatabaseError && /\(errno 1062\) \(sqlstate 23000\)/.test(err.message)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Slug already in use 🐛',
          });
        }
        throw err;
      }
      const [url] = await tx.select().from(urls).where(eq(urls.slug, input.slug));
      return url;
    });
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
    const [{ count }] = await ctx.db
      .select({ count: sql`count(*)`.mapWith(Number) })
      .from(urls)
      .where(eq(urls.slug, input));
    return {
      isAvailable: count === 0,
    };
  }),
});

export type AppRouter = typeof appRouter;
