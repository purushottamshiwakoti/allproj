"use client";

import { sidebarNav } from "@/lib/nav";
import { Button } from "./ui/button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useGetCurrentUser } from "@/hooks/get-auth-user";

export const SideNavs = () => {
  const params = useParams();
  const path = usePathname();
  const user = useGetCurrentUser();

  // Filter navigation items based on user's role
  const filteredNav = sidebarNav.filter((item) => {
    if (user && user.role == "SUPERADMIN") {
      return true; // Show all items for super admins
    } else if (user && user.role == "ADMIN") {
      return item.isAdmin; // Show only admin-relevant items for admins
    } else if (user && user.role == "SUBADMIN") {
      return item.isSubAdmin; // Show only admin-relevant items for admins
    } else {
      return !item.isSuperAdmin && !item.isAdmin; // Show non-admin items for regular users
    }
  });

  return (
    <>
      <div className="space-y-4">
        {filteredNav.map((item, index) => (
          <div key={index}>
            <Button
              className="w-full flex justify-start text-white"
              variant={path.includes(item.href) ? "default" : "link"}
              asChild
            >
              {params.id ? (
                <Link href={`/${params.id}${item.href}`}>{item.name}</Link>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </Button>
          </div>
        ))}
        {params.id && (
          <Button
            className="w-full flex justify-start text-white"
            variant={path.includes("token") ? "default" : "link"}
            asChild
          >
            <Link href={`/${params.id}/token`}>Token</Link>
          </Button>
        )}
      </div>
    </>
  );
};
