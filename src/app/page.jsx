import Dashboard from "./dashboard/page";
import Login from "./login/page";

export default function Home() {
  return (
    <div className="overflow-hidden justify-center items-center flex flex-col h-screen">
      <Login />
    </div>
  );
}
