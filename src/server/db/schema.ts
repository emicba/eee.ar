import { sql } from 'drizzle-orm';
import { pgTableCreator, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `eee_${name}`);

export const urls = createTable(
  'urls',
  {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 256 }).notNull(),
    url: varchar('url', { length: 2000 }).notNull(),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (urls) => ({
    slugIndex: uniqueIndex('slug_index').on(urls.slug),
  })
);
