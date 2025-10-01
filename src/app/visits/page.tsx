import { auth } from "@/auth";
import { PrismaClient } from '@prisma/client';

async function getVisits(userId: string) {
  const prisma = new PrismaClient();
  const temples = await prisma.visit.findMany({
    where: { userId },
    include: {
      temple: true,
      ordinances: {
        include: { ordinance: true },
      },
    }
  });

  return temples;
}

export default async function VisitList() {
  const session = await auth(); // or getServerSession if using next-auth directly

  console.log(session)
  if (!session?.user?.id) {
    return <div className="p-6">Please log in to see your visits.</div>;
  }

  const visits = await getVisits(session.user.id);

  return (
    <div className="p-6">
      <h1>Visit List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Temple</th>
            <th>Session Date</th>
            <th>Notes</th>
            <th>Ordinances</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit.id}>
              <td>{visit.id}</td>
              <td>{visit.temple.name}</td>
              <td>{visit.sessionDate.toDateString()}</td>
              <td>{visit.userNote}</td>
              <td>{visit.ordinances.map((ordinances) => ordinances.ordinance.name).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
