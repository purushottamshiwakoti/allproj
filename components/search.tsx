// Import statements at the top

"use client";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { useState } from "react";

// Define the Search component
const Search = ({
  searchKey,
  searchParams,
}: {
  searchKey: string;
  searchParams: any;
}) => {
  // Hooks
  const router = useRouter();
  const path = usePathname();
  const [inputValue, setInputValue] = useState("");

  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Handle change function
  const handleChange = debounce((e: string) => {
    setInputValue(e);
    updateSearchParams(e);
  }, 300); // 300 milliseconds debounce time

  // Function to update search parameters
  const updateSearchParams = (value: string) => {
    // Update search parameters
    const updatedSearchParams = {
      ...searchParams,
      [searchKey.toLowerCase()]: value.toLowerCase(),
    };

    // Construct query string
    const queryString = Object.entries(updatedSearchParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
      )
      .join("&");

    // Push the updated query string to the router
    router.push(`${path}?${queryString}`);
  };

  // Function to clear input and update search parameters
  const handleClear = () => {
    setInputValue("");
    updateSearchParams(""); // Clear the search key value
  };

  return (
    <div>
      <form action="">
        <div className="relative">
          {/* Input component */}
          <Input
            placeholder={`Filter ${searchKey}...`}
            value={inputValue}
            className="lg:w-[25rem] w-auto capitalize"
            onChange={(e) => handleChange(e.target.value)}
          />
          {/* Clear button */}
          {inputValue && inputValue.length > 0 && (
            <X
              className="absolute right-7 top-2 w-5 h-5 text-zinc-600 cursor-pointer"
              onClick={handleClear}
            />
          )}
        </div>
        {/* Hidden submit button */}
        <button type="submit" className="hidden">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search; // Export the Search component
