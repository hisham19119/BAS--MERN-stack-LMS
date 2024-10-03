"use client";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import React from "react";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isPlayerPage = pathname.includes("/chapters");
  const isSearchPage = pathname.includes("/search");

  return (
    <>
      <div className="ml-auto flex gap-x-2 ">
        {isSearchPage || isPlayerPage ? (
          <Link href="/dashboard/search">
            <Button className="sm flex gap-x-2" variant="outline">
              <LogOutIcon />
              Exit
            </Button>
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default NavbarRoutes;
