import { Plus, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const AddButton = ({ href }: { href: string }) => {
  return (
    <div>
      <Button className="" asChild>
        <Link href={href}>
          <PlusCircle className="w-5 h-5 mr-1" />
          Add
        </Link>
      </Button>
    </div>
  );
};
