import type { Prisma } from "@prisma/client";

export const visitWithTempleArgs = {
  include: {
    temple: true
  }
} satisfies Prisma.VisitDefaultArgs;

export type VisitWithTemple = Prisma.VisitGetPayload<typeof visitWithTempleArgs>