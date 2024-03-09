import { AuthUser } from "@/lib/auth-user";
import { notFound } from "next/navigation";

export const Navbar = async () => {
  const user = await AuthUser();
  if (!user) {
    notFound();
  }
  return (
    <>
      <div className="fixed top-0 h-14 bg-white w-full border-b flex items-center  px-10">
        <div className="text-primary font-medium">Admin Dashboard</div>
        <div className="text-primary font-medium ml-20">
          Welcome {user.name}
        </div>
      </div>
    </>
  );
};
