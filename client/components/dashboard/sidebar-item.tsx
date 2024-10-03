import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface sidebarItemProps {
  icon: LucideIcon;
  label: String;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: sidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (pathname === "/" && href === "/") || pathname === href;
  const handleOnClick = () => {
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-[var(--textpur)] hover:bg-[var(--item)] ",
        isActive && `text-[var(--textpur)] bg-[var(--item)]`
      )}
    >
      <div className="flex items-center gap-x-2 w-full py-4">
        <Icon
          size={22}
          className={cn(
            "",
            isActive && `text-[var(--textpur)] bg-[var(--item)]`
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "border-2 ",
          isActive && `border-[var(--textpur)] h-full `
        )}
      />
    </button>
  );
};

export default SidebarItem;
