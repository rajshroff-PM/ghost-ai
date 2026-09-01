import { PrismaPg } from "@prisma/adapter-pg";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@/app/generated/prisma/client";

/**
 * Prisma Postgres hands out two kinds of connection string. A
 * `prisma+postgres://` URL goes through Accelerate, which is driven by
 * `accelerateUrl` + the Accelerate extension and must NOT be handed to a driver
 * adapter. Anything else is a plain TCP Postgres URL, which uses the `pg`
 * driver adapter directly.
 */
function createPrismaClient() {
  const url = process.env.DATABASE_URL;

  if (url?.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url }).$extends(withAccelerate());
  }

  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
}

type CachedPrismaClient = ReturnType<typeof createPrismaClient>;

// Next.js clears the module registry on every hot reload in development, which
// would otherwise open a new connection pool per edit. Caching on globalThis
// survives that; in production the module is only evaluated once.
const globalForPrisma = globalThis as unknown as {
  prisma?: CachedPrismaClient;
};

export const prisma: CachedPrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
