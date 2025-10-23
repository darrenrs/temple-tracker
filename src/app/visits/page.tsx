import { auth } from "@/auth";
import { PrismaClient } from '@prisma/client';
import VisitList from './VisitList'
import { visitWithTempleArgs, type VisitWithTemple } from '@/app/types/VisitWithTemple';

async function getVisits(userId: string) {
  const prisma = new PrismaClient();
  const visits: VisitWithTemple[] = await prisma.visit.findMany({
    ...visitWithTempleArgs,
    where: { userId }
  });

  return visits;
}

export default async function VisitListPage() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return 'Please log in.';
  }

  const visits = await getVisits(user!.id);

  return (
    <>
      <h1 className="text-2xl pb-2">Your Visits</h1>
      <p className="text-sm italic pb-4">Click a visit for more info!</p>
      <VisitList data={visits} />
    </>
  );
}
