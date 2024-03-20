// Import statements at the top

"use client";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { useState } from "react";

const Search = ({
  searchKey,
  searchParams,
}: {
  searchKey: string;
  searchParams: any;
}) => {
  const router = useRouter();
  const path = usePathname();
  const [inputValue, setInputValue] = useState("");

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleChange = debounce((e: string) => {
    setInputValue(e);
    updateSearchParams(e);
  }, 50);

  const updateSearchParams = (value: string) => {
    const updatedSearchParams = {
      ...searchParams,
      [searchKey.toLowerCase()]: value.toLowerCase(),
    };
    const queryString = Object.entries(updatedSearchParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
      )
      .join("&");
    router.push(`${path}?${queryString}`);
  };

  const handleClear = () => {
    setInputValue("");
    updateSearchParams("");
  };

  return (
    <div>
      <form>
        <div className="relative">
          <Input
            placeholder={`Filter ${searchKey}...`}
            value={inputValue}
            className=" capitalize"
            onChange={(e) => handleChange(e.target.value)}
          />
          {inputValue && inputValue.length > 0 && (
            <X
              className="absolute right-2 top-2 w-5 h-5 text-zinc-600 cursor-pointer"
              onClick={handleClear}
            />
          )}
        </div>
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search;
