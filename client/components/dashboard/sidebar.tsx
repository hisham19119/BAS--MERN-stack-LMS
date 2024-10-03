import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full font-bold border-r flex flex-col pt-4 gap-y-8 bg-[var(--sidebar)]">
      <div>
        <Logo />
      </div>
      <SidebarRoutes />
    </div>
  );
};
