import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
interface sidebarItemProps {
  label: String;
  href: string;
}

const SidebarItem = ({ label, href }: sidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[5];
  const isActive =
    (pathname.includes(`/chapters/${id}`) &&
      href.includes(`/chapters/${id}`)) ||
    pathname === href;
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
      <div className="flex items-center gap-x-2 w-full py-2">{label}</div>
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
