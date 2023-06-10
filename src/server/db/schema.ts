import { sql } from 'drizzle-orm';
import { datetime, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

export const urls = mysqlTable(
  'Url',
  {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 256 }).notNull(),
    url: varchar('url', { length: 2000 }).notNull(),
    createdAt: datetime('createdAt', { fsp: 3 })
      .notNull()
      .default(sql`current_timestamp(3)`),
  },
  (urls) => ({
    slugIndex: uniqueIndex('slug_index').on(urls.slug),
  })
);
