import prisma from "@/db/index";

type StackUser = {
  id: string;
  displayName: string | null;
  primaryEmail: string | null;
};

/**
 * Ensures the Stack Auth user exists in our local users table.
 * Call this before creating articles to ensure the foreign key reference works.
 */
export async function ensureUserExists(stackUser: StackUser): Promise<void> {
  await prisma.usersSync.upsert({
    where: { id: stackUser.id },
    update: {
      name: stackUser.displayName,
      email: stackUser.primaryEmail,
    },
    create: {
      id: stackUser.id,
      name: stackUser.displayName,
      email: stackUser.primaryEmail,
    },
  });
}
