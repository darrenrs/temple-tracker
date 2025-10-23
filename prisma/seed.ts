import fs from 'node:fs';
import { PrismaClient } from '@prisma/client'
import type { Temple, TempleStatus, Ordinance } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {
  // Create temple ordinances
  const rawOrdinances = fs.readFileSync("prisma/data/ordinances.json", "utf8");
  const itemsOrdinances: Ordinance[] = JSON.parse(rawOrdinances);
  await prisma.ordinance.createMany( {data: itemsOrdinances} );

  // Create temple statuses
  // These MUST be in the correct order to match up with `templeStatusId` in temples.json
  const rawTempleStatuses = fs.readFileSync("prisma/data/templeStatuses.json", "utf8");
  const itemsTempleStatuses: TempleStatus[] = JSON.parse(rawTempleStatuses);
  await prisma.templeStatus.createMany( {data: itemsTempleStatuses} );

  // Create temples
  const rawTemples = fs.readFileSync("prisma/data/temples.json", "utf8");
  const itemsTemples: Temple[] = JSON.parse(rawTemples);
  await prisma.temple.createMany( {data: itemsTemples} );
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async() => { await prisma.$disconnect() })