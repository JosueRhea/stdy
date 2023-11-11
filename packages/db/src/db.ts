import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { DB_URL } from "../env.mjs";
import * as schema from "./schema";

const client = postgres(DB_URL as string);

export const db = drizzle(client, { schema });
