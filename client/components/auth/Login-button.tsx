"use client";
import { useRouter } from "next/navigation";
interface loginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  isChild?: boolean;
}
export const LoginButton = ({
  children,
  mode = "redirect",
  isChild,
}: loginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    console.log("login Button Clicked");
    router.push("/auth/login");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
