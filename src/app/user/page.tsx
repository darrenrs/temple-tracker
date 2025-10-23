import { auth } from "@/auth";
import { PrismaClient } from '@prisma/client';

async function getUserInformation(id: string) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id }
  });

  return user;
}

export default async function UserPage() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return 'Please log in.';
  }

  const userInformation = await getUserInformation(user.id);

  return (
    <>
      <h1 className="text-2xl pb-2">User Info</h1>

      <table className="min-w-full border-collapse text-xs sm:text-sm">
        <thead>
          <tr>
            <th className="text-left p-2 border-b">Key</th>
            <th className="text-left p-2 border-b">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border-b">Account ID</td>
            <td className="p-2 border-b">{userInformation?.id}</td>
          </tr>
          <tr>
            <td className="p-2 border-b">Name</td>
            <td className="p-2 border-b">{userInformation?.name}</td>
          </tr>
          <tr>
            <td className="p-2 border-b">Email</td>
            <td className="p-2 border-b">{userInformation?.email}</td>
          </tr>
          <tr>
            <td className="p-2 border-b">User Type</td>
            <td className="p-2 border-b">{userInformation?.isAdmin ? "Admin" : "Standard"} User</td>
          </tr>
          <tr>
            <td className="p-2 border-b">Date Created</td>
            <td className="p-2 border-b">{userInformation?.createdAt.toISOString()}</td>
          </tr>
          <tr>
            <td className="p-2 border-b">Date Updated</td>
            <td className="p-2 border-b">{userInformation?.updatedAt.toISOString()}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
