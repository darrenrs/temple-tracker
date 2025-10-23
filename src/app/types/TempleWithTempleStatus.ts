import type { Prisma } from "@prisma/client";

export const templeWithTempleStatusArgs = {
  include: {
    templeStatus: true
  }
} satisfies Prisma.TempleDefaultArgs;

export type TempleWithTempleStatus = Prisma.TempleGetPayload<typeof templeWithTempleStatusArgs>