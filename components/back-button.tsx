import { ArrowLeft, Plus, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const BackButton = ({ href }: { href: string }) => {
  return (
    <div>
      <Button className="" asChild>
        <Link href={href}>
          <ArrowLeft className="w-5 h-5 mr-1" />
          Go Back
        </Link>
      </Button>
    </div>
  );
};
