import { FC } from "react";
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
  return (
    <div className="w-full fixed z-20">
      <div className="bg-blue">
        <nav className="content flex flex-wrap justify-between py-5 p-4 md:pb-6 box-border">
          <div className="flex flex-col justify-center">
            <Link href="/">
              <a>
                <img src="/common/logo-with-text.svg" alt="UW Blueprint logo" />
              </a>
            </Link>
          </div>
          <button className="lg:hidden -mr-0.5">
            <img src="/common/menu.svg" alt="Menu" />
          </button>
          <div className="hidden lg:flex flex-wrap space-x-7">
            <div className="flex items-center space-x-6">
              {ROUTES.map((route) => (
                <Link key={route.name} href={route.link}>
                  <a className="text-sm font-poppins font-normal text-white">
                    {route.name}
                  </a>
                </Link>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button
                className="bg-transparent"
                size="md"
                variant="secondary"
                invert
                href="/join"
              >
                Join Our Team!
              </Button>
              <Button size="md" invert href="/nonprofits">
                For Nonprofits
              </Button>
            </div>
          </div>
        </nav>
      </div>
      <img
        className="w-full -mt-0.5 md:hidden"
        src="common/navbar-wave-sm.svg"
      />
    </div>
  );
};

export default Navbar;
