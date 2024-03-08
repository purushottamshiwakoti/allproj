"use client";

import { sidebarNav } from "@/lib/nav";
import { Button } from "./ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

export const SideNavs = () => {
  const params = useParams();
  console.log(params.id);
  return (
    <>
      <div className="space-y-4">
        {sidebarNav.map((item, index) => (
          <div key={index}>
            <Button
              className="w-full flex justify-start text-white"
              variant={"link"}
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
      </div>
    </>
  );
};
