import { auth } from "@/auth";
import { PrismaClient } from '@prisma/client';

const toDatetimeLocal = (date: Date) => {
  const pad = (n: int) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

async function getTemples() {
  const prisma = new PrismaClient();
  const temples = await prisma.temple.findMany({
    include: {
      templeStatus: true
    }
  });

  return temples;
}

async function getOrdinances() {
  const prisma = new PrismaClient();
  const ordinances = await prisma.ordinance.findMany({
  });

  return ordinances;
}

export async function createVisit(data: FormData) {
  "use server";

  const prisma = new PrismaClient();
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    throw new Error('Please log in.');
  }

  const userId = user!.id;
  const templeId = parseInt(data!.get('templeId') as string);
  const sessionDate = new Date(data!.get('sessionDate') as string);
  const userNote = data.get('userNote') as string;

  const visit = await prisma.visit.create({
    data: {
      userId: userId,
      templeId: templeId,
      sessionDate: sessionDate,
      userNote: userNote
    },
  });
}

export default async function UserVisitAddPage() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return 'Please log in.';
  }

  const temples = await getTemples();
  const ordinances = await getOrdinances();

  return (
    <>
      <h1 className="text-2xl pb-2">Add Visit</h1>
      <form action={createVisit}>
        <div className="flex flex-col sm:grid sm:grid-cols-2 sm:justify-end mb-8">
          <label htmlFor="temple" className="text-xl">Temple</label>
          <select id="temple" name="templeId" className="text-gray-300 bg-gray-800 rounded-full" required>
            {temples.map((temple) => (
              <option key={temple.id} id={temple.slug} value={temple.id}>{temple.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 sm:justify-end mb-8">
          <label htmlFor="sessionDate" className="text-xl">Date/Time</label>
          <input type="datetime-local" id="sessionDate" name="sessionDate" defaultValue={toDatetimeLocal(new Date())} className="text-gray-300 bg-gray-800 rounded-full" required></input>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 sm:justify-end mb-8">
          <label htmlFor="userNote" className="text-xl">Visit Summary</label>
          <textarea id="userNote" name="userNote" className="text-gray-300 bg-gray-800 rounded-md"></textarea>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 sm:justify-end mb-8">
          <label className="text-xl">Ordinances</label>
          <ul className="grid grid-cols-2 sm:grid-cols-3">
            {ordinances.map((ordinance) => (
              <li key={ordinance.id}>
                <input type="checkbox" id={`ordinance[${ordinance.id}]`} name={`ordinance[${ordinance.id}]`} value="1" className="text-gray-300 bg-gray-800 rounded-md mr-1"></input>
                <label htmlFor={`ordinance[${ordinance.id}]`} className="text-sm">{ordinance.name}</label>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="text-gray-300 bg-gray-800 rounded-md mr-1 px-4 py-2 text-lg hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add New Visit!</button>
      </form>
    </>
  );
}