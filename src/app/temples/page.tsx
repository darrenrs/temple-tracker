import { PrismaClient } from '@prisma/client';

async function getTemples() {
  const prisma = new PrismaClient();
  const temples = await prisma.temple.findMany({
    include: {
      templeStatus: true
    }
  });

  return temples;
}

export default async function TempleMasterList() {
  const temples = await getTemples();

  return (
    <div className="p-6">
      <h1>Temple List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date Dedicated</th>
          </tr>
        </thead>
        <tbody>
          {temples.map((temple) => (
            <tr key={temple.id}>
              <td>{temple.slug}</td>
              <td>{temple.name}</td>
              <td>{temple.city}, {temple.state}, {temple.country}</td>
              <td>{temple.templeStatus?.name ?? "Unknown"}</td>
              <td>{temple.dateDedicated?.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
