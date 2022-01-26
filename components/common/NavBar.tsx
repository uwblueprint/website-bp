import { FC, useState } from "react";
import Link from "next/link";
import Button from "@components/common/Button";

const ROUTES = [
  { name: "About Us", link: "/about" },
  { name: "Projects", link: "/projects" },
  { name: "Students", link: "/students" },
  { name: "Contact", link: "/contact" },
];

/** Navbar */
const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full fixed z-30">
        <div className="bg-blue">
          <nav className="content flex flex-wrap space-x-4 lg:space-x-0 lg:justify-between pb-3 p-6 md:pb-6 box-border">
            <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
              <img className="" src="/common/menu.svg" alt="Menu" />
            </button>
            <Logo />
            <div className="hidden lg:flex flex-wrap space-x-7">
              <div className="flex items-center space-x-6 text-sm">
                <Links />
              </div>
              <div className="flex space-x-4">
                <Buttons />
              </div>
            </div>
          </nav>
        </div>
        <img
          className="w-full -mt-0.5 md:hidden"
          src="common/navbar-wave-sm.svg"
        />
      </div>
      {menuOpen && (
        <div className="fixed h-screen w-screen z-40 flex lg:hidden">
          <div className="h-full bg-blue-200 w-64 pl-8 pr-12 py-14 space-y-12">
            <Logo />
            <div className="flex flex-col space-y-6 text-lg">
              <Links />
            </div>
            <div className="flex flex-col space-y-5">
              <Buttons extraClasses={"text-lg h-14 whitespace-nowrap"} />
            </div>
          </div>
          <div
            className="w-full bg-black bg-opacity-40"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
};

const Logo = () => {
  return (
    <div className="flex flex-col justify-center">
      <Link href="/">
        <img src="/common/logo-with-text.svg" alt="UW Blueprint logo" />
      </Link>
    </div>
  );
};

const Links = () => {
  return (
    <>
      {ROUTES.map((route) => (
        <Link key={route.name} href={route.link}>
          <a className="font-poppins font-normal text-white">{route.name}</a>
        </Link>
      ))}
    </>
  );
};

const Buttons: FC<{ extraClasses?: string }> = ({ extraClasses }) => {
  return (
    <>
      <Button
        className={`bg-transparent ${extraClasses}`}
        size="md"
        variant="secondary"
        invert
        href="/join"
      >
        Join Our Team!
      </Button>
      <Button className={`${extraClasses}`} size="md" invert href="/nonprofits">
        For Nonprofits
      </Button>
    </>
  );
};

export default Navbar;
