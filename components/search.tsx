"use client";

import React, { useState } from "react";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

const Search = ({ searchKey }: { searchKey: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const [s, setS] = useState<any>(searchParams.get("s"));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`${path}?s=${s}`);
  };
  const clearSearch = (e: any) => {
    e.preventDefault();
    console.log(s);
    router.push(`${path}`);
  };
  return (
    <>
      <div>
        <form action="" onSubmit={(e: any) => handleSubmit(e)}>
          <div className="relative">
            <Input
              placeholder={`Filter ${searchKey}...`}
              className="lg:w-[25rem] w-auto cap "
              value={s}
              onChange={(e) => {
                e.target.value.length > 0
                  ? setS(e.target.value)
                  : clearSearch(e),
                  setS(e.target.value);
              }}
            />
            {s && s.length > 0 ? (
              <X
                className="absolute right-0 top-2 mr-2 w-5 h-5 text-zinc-600 cursor-pointer"
                onClick={(e: any) => {
                  setS(""), clearSearch(e);
                }}
              />
            ) : null}
          </div>
          <button type="submit" className="hidden">
            yes
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
