"use client";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchInput from "./search-input";
import React from "react";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname.includes("/chapters");
  const isSearchPage = pathname.includes("/search");
  const isDashboardPage = pathname.includes("/dashboard");
  const handleSearch = (searchTerm: string) => {
    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <>
      {isSearchPage && (
        <div className="ml-auto">
          <SearchInput onSearch={handleSearch} />
        </div>
      )}
      <div className="ml-auto flex gap-x-2 ">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/dashboard">
            <Button className="sm flex gap-x-2" variant="outline">
              <LogOutIcon />
              Exit
            </Button>
          </Link>
        ) : null}
        {isDashboardPage && (
          <div>
            <Link href="/teacher/create">
              <Button className="sm flex gap-x-2 text-[var(--textpur)] bg-[var(--item]">
                Teacher Mode
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarRoutes;
