import Image from "next/image";
import NavBar from "@/app/components/navbar";

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      <div className="p-6">
        <p>Welcome to the Temple Tracker (Alpha Version)</p>
      </div>
    </>
  );
}
