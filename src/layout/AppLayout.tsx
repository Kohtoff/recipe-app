import { Outlet } from "react-router";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen min-w-screen relative flex flex-col">
      <Header />
      <main className="mx-auto w-full grow flex flex-col bg-white max-w-2xl px-4 py-6 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        {<Outlet />}
      </main>
    </div>
  );
};

export default AppLayout;
