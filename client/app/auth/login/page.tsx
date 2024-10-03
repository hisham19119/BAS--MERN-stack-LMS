import React from "react";
import { LoginForm } from "@/components/auth/Login-form";
import Photo from "../../../public/images/home.jpg";
function loginPage() {
  return (
    <div
      className=" h-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${Photo.src})`,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LoginForm />
    </div>
  );
}

export default loginPage;
