import { FC, useState } from "react";
import Link from "next/link";
import { APPLICATION_IS_LIVE, APPLICATION_LINK } from "@constants/applications";
import Button from "./Button";

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
        {APPLICATION_IS_LIVE && (
          <Link href={APPLICATION_LINK}>
            <p className="w-full text-center py-1 bg-charcoal-0 font-poppins underline">
              Applications to join the Winter 2022 team are now open, apply
              here! 🎉
            </p>
          </Link>
        )}
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
          <div className="h-full bg-blue-200 w-64 md:w-80 pl-8 pr-8 py-14 space-y-12">
            <div className="flex justify-between">
              <Logo />
              <button onClick={() => setMenuOpen(false)}>
                <img className="stroke-3" src={"common/close-menu.svg"} />
              </button>
            </div>
            <div className="flex flex-col space-y-6 text-lg">
              <Links />
            </div>
            <div className="flex flex-col space-y-5">
              <Buttons extraClasses={"text-lg h-14 whitespace-nowrap"} />
            </div>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-40"
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
