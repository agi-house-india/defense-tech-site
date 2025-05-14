import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client/web";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// @ts-expect-error PrismaLibSQL type definition is not fully compatible with Prisma's expected adapter type
const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export default prisma;
