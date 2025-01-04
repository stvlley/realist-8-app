import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ 
  path: ".env.local" 
});

const DATABASE_PATH = process.env.DATABASE_URL;


if (typeof process.env.DATABASE_URL !== 'string') {
    throw new Error("DATABASE_URL is not defined");
}

export default defineConfig({
  out: './src/lib/db/migrations',
  schema: './src/lib/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_PATH! as string,
  },
  verbose: true,
  strict: true,
});


