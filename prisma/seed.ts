import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

/** Stand-in for a Clerk user ID until real projects are created through the app. */
const SEED_OWNER_ID = "user_seed_owner";

const seedProjects = [
  {
    name: "Checkout Platform",
    description: "Payments, cart, and order orchestration.",
    collaborators: ["ada@example.com", "grace@example.com"],
  },
  {
    name: "Event Ingest Pipeline",
    description: "High-throughput ingest and fan-out.",
    collaborators: ["linus@example.com"],
  },
  {
    name: "Billing Service",
    description: null,
    collaborators: [],
  },
];

async function main() {
  for (const { name, description, collaborators } of seedProjects) {
    const existing = await prisma.project.findFirst({
      where: { ownerId: SEED_OWNER_ID, name },
      select: { id: true },
    });

    if (existing) {
      console.log(`Skipped (already seeded): ${name}`);
      continue;
    }

    await prisma.project.create({
      data: {
        ownerId: SEED_OWNER_ID,
        name,
        description,
        collaborators: {
          create: collaborators.map((email) => ({ email })),
        },
      },
    });

    console.log(`Seeded: ${name}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
