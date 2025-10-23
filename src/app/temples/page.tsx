import { PrismaClient } from '@prisma/client';
import TempleList from './TempleList'
import { templeWithTempleStatusArgs, type TempleWithTempleStatus } from '@/app/types/TempleWithTempleStatus';

async function getTemples() {
  const prisma = new PrismaClient();
  const temples: TempleWithTempleStatus[] = await prisma.temple.findMany(templeWithTempleStatusArgs);

  return temples;
}

export default async function TempleListPage() {
  const temples = await getTemples();

  return (
    <>
      <h1 className="text-2xl pb-2">Temple List</h1>
      <p className="text-sm italic pb-4">Click a temple for more info!</p>
      <TempleList data={temples} />
    </>
  );
}
