import { auth } from "@/auth";
import { PrismaClient } from '@prisma/client';

async function getVisitById(userId: string, visitId: string) {
  const prisma = new PrismaClient();
  const visit = await prisma.visit.findUnique({
    where: {
      userId,
      id: visitId
    },
    include: {
      temple: true,
      ordinances: {
        include: { ordinance: true },
      },
    }
  });

  return visit;
}

export async function deleteVisit(data: FormData) {
  "use server";

  const prisma = new PrismaClient();
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    throw new Error('Please log in.');
  }

  const visitId = data.get('visitId') as string;

  const visit = await prisma.visit.delete({
    where: {
      id: visitId
    }
  });
}

export default async function UserVisitDetailedInformationPage({
  params,
}: {
  params: Promise<{ visitId: string }>;
}) {
  const session = await auth();
  const user = session?.user;
  const visitId = (await params).visitId;

  if (!user?.id) {
    return 'Please log in.';
  }

  const visit = await getVisitById(user.id, visitId);

  return (
    <>
      <h1 className="text-2xl pb-2">Visit {visit?.id}</h1>
      <p className="text-sm italic pb-4">Date: {visit?.sessionDate? visit.sessionDate.toLocaleString() : "?"}, Location: {visit?.temple.name}</p>
      <form action={deleteVisit}>
        <input type="text" id="visitId" name="visitId" defaultValue={visitId} className="hidden" required></input>
        <button type="submit" className="text-gray-300 bg-gray-800 rounded-md mr-1 px-4 py-2 text-lg hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Delete Visit :(</button>
      </form>
    </>
  );
}