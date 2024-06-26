import { type Config } from 'drizzle-kit';

export default {
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  tablesFilter: ['eee_*'],
} satisfies Config;
