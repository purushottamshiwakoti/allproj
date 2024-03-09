"use client";

import { Logout } from "@/actions/logout";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  const onClick = () => {
    Logout();
  };
  return (
    <>
      <Button onClick={onClick} className="cursor-pointer">
        Logout
      </Button>
    </>
  );
};
