import React from "react";
import { RegisterForm } from "@/components/auth/Register-form";
import Photo from "../../../public/images/home.jpg";
function RegisterPage() {
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
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
