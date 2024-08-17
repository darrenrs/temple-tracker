import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between p-3 bg-gray-800 text-gray-300">
        <a href="/" className="flex">
          <Image src="/favicon.ico" width="32" height="32" alt="Vercel Temp Icon"></Image>
          <span className="ml-2 text-2xl">Temple Tracker</span>
        </a>
        <ul className="flex flex-row">
          <li className="mr-5">
            <Link href="visits">Visit Tracker</Link>
          </li>
          <li className="mr-5">
            <Link href="temple-list">List of Temples</Link>
          </li>
          <li>
            <Link href="account"><FaUser/></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
