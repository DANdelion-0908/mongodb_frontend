import Image from "next/image";
import Login from "./login/page";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div className="overflow-hidden justify-center items-center flex flex-col h-screen">
      <Dashboard />
    </div>
  );
}
