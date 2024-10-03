import { Main } from "@/components/home/main";
import Photo from "../public/images/home.jpg";

export default function Home() {
  return (
    <main
      className=" h-full flex flex-col items-center "
      style={{
        backgroundImage: `url(${Photo.src})`,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Main />
    </main>
  );
}
