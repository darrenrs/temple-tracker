// INCOMPLETE
import NavBar from "@/app/components/Navbar";
import { PrismaClient } from '@prisma/client';

// do I need this?
type Temple = {
  name: string,
  country: string,
  province: string,
  city: string,
  latitude: number,
  longitude: number,
  status: number
}

async function getTemples() {
  const prisma = new PrismaClient()
  const temples = await prisma.temple_list.findMany()

  return temples
}

export default async function TempleMasterList() {
  // const temples = await getTemples()

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl">Temple List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {/* {temples.map((temple) => (
              <tr key={temple.id}>
                <td>{temple.name}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
}
