import { auth } from "@/auth";
import { PrismaClient } from '@prisma/client';

export default async function User() {
  const session = await auth(); // or getServerSession if using next-auth directly

  console.log(session)
  if (!session?.user?.id) {
    return <div className="p-6">You are not authenticated.</div>;
  }

  return (
    <div className="p-6">
      <h1>User Info</h1>
      <div>Name: {session.user.name}</div>
      <div>Email: {session.user.email}</div>
    </div>
  );
}
