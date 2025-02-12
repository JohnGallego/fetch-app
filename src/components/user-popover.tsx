"use client";

import { logoutUser } from "@/app/actions/auth.actions";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";
import * as React from "react";

const UserPopover = () => {
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await logoutUser();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="rounded-full h-8 w-8 p-0">
          <User className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
