import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "./navbar-routes";

const Navbar = () => {
  return (
    <div className="w-full h-full flex items-center justify-between p-4 ">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
