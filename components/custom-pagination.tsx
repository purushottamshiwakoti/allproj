"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export const CustomPagination = ({ length }: { length: number }) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams.get("pg") || "1");
  const pageSize = 8; // Assuming 8 items per page
  const [currentPage, setCurrentPage] = useState(pageNumber);

  const pageCount = Math.ceil(length / pageSize);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    router.push(`${path}?pg=${currentPage}`);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount));
  };

  return (
    <Pagination className="mt-3">
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            variant={"link"}
            className="text-black"
          >
            Previous
          </Button>
        </PaginationItem>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <Link href={`${path}?pg=${page}`}>
              <Button
                variant={page === currentPage ? "default" : "ghost"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            </Link>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            onClick={handleNext}
            disabled={currentPage === pageCount}
            variant={"link"}
            className="text-black"
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
