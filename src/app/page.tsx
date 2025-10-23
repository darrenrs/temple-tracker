import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl pb-6">Welcome to Temple Tracker{ user ? `, ${user.name}` : "" }.</h1>
      <p className="text-center text-sm sm:text-md md:text-lg italic">
        {
          user ?
          "Click Add Visit to add a visit." :
          "Please log in or create an account to get started!"
        }
      </p>
    </>
  );
}