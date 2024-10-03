"use client";
import { BarChart, Compass, Layout, List, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
  {
    icon: Users,
    label: "Users",
    href: "/teacher/users",
  },
];

const studentRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/dashboard/search",
  },
];

export const SidebarRoutes = () => {
  const path = usePathname();
  const routes = path.includes("teacher") ? teacherRoutes : studentRoutes;
  return (
    <div className="h-full p-2 pr-0 flex flex-col gap-y-4">
      {routes.map((route, index) => (
        <SidebarItem
          key={index}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
