import { Link, useLocation } from "react-router-dom";
import { DrawerIcon } from "../Icons/Icons";
import AvatarDropDown from "./AvatarDropDown";

const Header = () => {
  const location = useLocation();
  const headerLinks = [
    <Link
      to={"/characters"}
      key={1}
      className={`font-bold ${
        location.pathname === "/characters" ? "text-yellow-400" : ""
      }`}
    >
      Personajes
    </Link>,
    <Link
      to={"/campaigns"}
      key={2}
      className={`font-bold ${
        location.pathname === "/campaigns" ? "text-yellow-400" : ""
      }`}
    >
      Campañas
    </Link>,
  ];

  return (
    <header className="drawer static top-0">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <DrawerIcon />
            </label>
          </div>
          <div className="navbar-start flex-1 px-2 mx-2 w-auto">
            <Link to="/" className="btn btn-ghost text-xl text-yellow-400">
              DnD
            </Link>
          </div>
          <div className="navbar-center w-auto">
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {headerLinks.map((link) => (
                  <li key={link.key}>{link}</li>
                ))}
              </ul>
            </div>
          </div>
          <AvatarDropDown />
        </div>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          {headerLinks.map((link) => (
            <li key={link.key}>{link}</li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
