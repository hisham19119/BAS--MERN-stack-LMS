"use client";
import Navbar from "@/components/dashboard/navbar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCoursePage =
    pathname.startsWith("/dashboard/search/") &&
    pathname !== "/dashboard/search/";

  if (isCoursePage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full bg-primary/30  ">
      <div className="w-full h-[80px] bg-[var(--sidebar)] fixed inset-y-0">
        <Navbar />
      </div>
      <div className=" max-md:hidden fixed inset-y-0 w-56 bg-primary/30 h-full ">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}
