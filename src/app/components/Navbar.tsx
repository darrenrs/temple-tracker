import Image from "next/image";
import Link from "next/link";
import { UserInfoProps } from '@/app/types/UserInfoProps';
import NavbarUserInfo from "@/app/components/NavbarUserInfo";
import GoogleLoginButton from "@/app/components/GoogleSignIn";

export default async function Navbar({ user }: UserInfoProps) {
  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between p-5 border-b border-b-gray-500 bg-slate-900 text-white">
        <Link href="/" className="flex space-x-3">
          <Image src="/icon.png" width="32" height="32" alt="App icon"></Image>
          <span className="text-2xl">Temple Tracker</span>
        </Link>
        <ul className="flex flex-row space-x-5 hover:*:text-blue-500 hover:*:cursor-pointer">
          <li>
            <Link href="temples">Temple List</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="visits">Your Visits</Link>
              </li>
              <li>
                <NavbarUserInfo user={user} />
              </li>
            </>
          ) : (
            <GoogleLoginButton />
          )}
        </ul>
      </div>
    </nav>
  );
};