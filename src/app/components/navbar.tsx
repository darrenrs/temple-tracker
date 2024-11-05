import Image from "next/image";
import Link from "next/link";
import { User } from '@auth/core/types';
import UserInformation from "@/app/components/UserInformation";
import GoogleLoginButton from "@/app/components/GoogleSignIn";
import GoogleLogoutButton from "./GoogleSignOut";

type UserInformationProps = {
  user: User | null;
};

export default async function Navbar({ user }: UserInformationProps) {
  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between p-5 bg-gray-900 text-gray-300">
        <a href="/" className="flex">
          <Image src="/icon.png" width="32" height="32" alt="App icon"></Image>
          <span className="ml-2 text-2xl">Temple Tracker</span>
        </a>
        <ul className="flex flex-row">
          <li className="mr-5">
            <Link href="visits">Visit Tracker</Link>
          </li>
          <li className="mr-5">
            <Link href="list">List of Temples</Link>
          </li>
          <li>
            {user ? (
              <>
                <UserInformation user={user} />
                <GoogleLogoutButton />
              </>
            ) : (
              <GoogleLoginButton />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};