import "dotenv/config";

import type { Config } from "drizzle-kit";

import { DB_URL } from "./env.mjs";

export default {
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: DB_URL as string,
  },
  driver: "pg",
  strict: true,
} satisfies Config;
