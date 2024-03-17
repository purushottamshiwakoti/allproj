"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

export const CopyToken = ({ token }: { token: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    toast.success("Successfully copied token to clipboard");
  };
  return (
    <div className="space-y-3">
      <h2 className="text-primary">Your token is {token}</h2>
      <Button onClick={handleCopy}>Copy Token</Button>
    </div>
  );
};
