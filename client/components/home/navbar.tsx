import { NavWrapper } from "./nav-wrapper";

export const Navbar = () => {
  return (
    <NavWrapper
      logoLabel="BAS"
      logoHref="/"
      enrollButtonLabel={"Enroll Now"}
      enrollButtonHref=" /auth/register"
    ></NavWrapper>
  );
};
