"use client";

import { sidebarNav } from "@/lib/nav";
import { Button } from "./ui/button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useGetCurrentUser } from "@/hooks/get-auth-user";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <div>
          {params.id ? (
            <div className="space-y-4">
              <Button
                className="w-full flex justify-start text-white"
                variant={path.includes("/dashboard") ? "default" : "link"}
                asChild
              >
                <Link href={`/${params.id}/dashboard`}>Dashboard</Link>
              </Button>
              <Button
                className="w-full flex justify-start text-white"
                variant={path.includes("/admins") ? "default" : "link"}
                asChild
              >
                <Link href={`/${params.id}/admins`}>Admins</Link>
              </Button>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <Button
                    asChild
                    className="w-full flex justify-start text-white"
                    variant={"link"}
                  >
                    <AccordionTrigger className="text-white">
                      Questions
                    </AccordionTrigger>
                  </Button>
                  <AccordionContent className="mt-4 space-y-3">
                    <Button
                      className="w-full flex justify-start text-white "
                      variant={path.includes("/category") ? "default" : "link"}
                      asChild
                    >
                      <Link href={`/${params.id}/category`}>Category</Link>
                    </Button>
                    <Button
                      className="w-full flex justify-start text-white "
                      variant={
                        path.includes("sub-category") ? "default" : "link"
                      }
                      asChild
                    >
                      <Link href={`/${params.id}/sub-category`}>
                        SubCategory
                      </Link>
                    </Button>
                    <Button
                      className="w-full flex justify-start text-white "
                      variant={
                        path.includes("question-type") ? "default" : "link"
                      }
                      asChild
                    >
                      <Link href={`/${params.id}/question-type`}>
                        QuestionType
                      </Link>
                    </Button>
                    <Button
                      className="w-full flex justify-start text-white "
                      variant={path.includes("questions") ? "default" : "link"}
                      asChild
                    >
                      <Link href={`/${params.id}/questions`}>
                        All Questions
                      </Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                className="w-full flex justify-start text-white"
                variant={path.includes("/files") ? "default" : "link"}
                asChild
              >
                <Link href={`/${params.id}/files`}>Files</Link>
              </Button>
            </div>
          ) : (
            // <Link href={item.href}>{item.name}</Link>
            <>
              <div className="space-y-4">
                <Button
                  className="w-full flex justify-start text-white"
                  variant={path.includes("/dashboard") ? "default" : "link"}
                  asChild
                >
                  <Link href={`/dashboard`}>Dashboard</Link>
                </Button>
                <Button
                  className="w-full flex justify-start text-white"
                  variant={path.includes("/admins") ? "default" : "link"}
                  asChild
                >
                  <Link href={`/admins`}>Admins</Link>
                </Button>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <Button
                      asChild
                      className="w-full flex justify-start text-white"
                      variant={"link"}
                    >
                      <AccordionTrigger className="text-white">
                        Questions
                      </AccordionTrigger>
                    </Button>
                    <AccordionContent className="mt-4 space-y-3">
                      <Button
                        className="w-full flex justify-start text-white "
                        variant={
                          path.includes("/category") ? "default" : "link"
                        }
                        asChild
                      >
                        <Link href={`/category`}>Category</Link>
                      </Button>
                      <Button
                        className="w-full flex justify-start text-white "
                        variant={
                          path.includes("sub-category") ? "default" : "link"
                        }
                        asChild
                      >
                        <Link href={`/sub-category`}>SubCategory</Link>
                      </Button>
                      <Button
                        className="w-full flex justify-start text-white "
                        variant={
                          path.includes("question-type") ? "default" : "link"
                        }
                        asChild
                      >
                        <Link href={`/question-type`}>QuestionType</Link>
                      </Button>
                      <Button
                        className="w-full flex justify-start text-white "
                        variant={
                          path.includes("questions") ? "default" : "link"
                        }
                        asChild
                      >
                        <Link href={`/questions`}>All Questions</Link>
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Button
                  className="w-full flex justify-start text-white"
                  variant={path.includes("/files") ? "default" : "link"}
                  asChild
                >
                  <Link href={`/files`}>Files</Link>
                </Button>
              </div>
            </>
          )}
        </div>
        {params.id ? (
          <Button
            className="w-full flex justify-start text-white"
            variant={path.includes("token") ? "default" : "link"}
            asChild
          >
            <Link href={`/${params.id}/token`}>Token</Link>
          </Button>
        ) : (
          <Button
            className="w-full flex justify-start text-white"
            variant={path.includes("projects") ? "default" : "link"}
            asChild
          >
            <Link href={`/projects`}>Projects</Link>
          </Button>
        )}
      </div>
    </>
  );
};
