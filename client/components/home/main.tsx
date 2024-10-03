import { Button } from "../ui/button";
import { Navbar } from "./navbar";
import Link from "next/link";
export const Main = () => {
  return (
    <div className="relative h-full w-full overflow-hidden ">
      <div className="relative z-20">
        <Navbar />
      </div>
      <div className="absolute inset-0 bg-black opacity-80 h-full " />
      <div className="relative  z-10 flex flex-col items-start justify-center h-full gap-y-10 max-md:gap-y-8 pl-16 max-sm:pl-8 max-sm:pr-8 ">
        <h1 className="text-[var(--text)]  text-6xl max-lg:text-3xl max-sm:text-2xl max-xs:text-lg ">
          BAS Online School <br />
          of Business Administration
        </h1>
        <p className="text-[var(--text)] text-xl  max-lg:text-sm  ">
          The destination for leaders who seek to change the world
        </p>
        <Button
          className="text-[var(--text)] text-lg border-2 hover:bg-[var(--bg)] hover:border-none"
          variant="ghost"
          size="lg"
        >
          <Link href="/auth/register">Enroll Now</Link>
        </Button>
      </div>
    </div>
  );
};
