import { FC } from "react";
import Link from "next/link";
import Button from "@components/common/Button";

const ROUTES = [
  { name: "About Us", link: "/about" },
  { name: "Projects", link: "/projects" },
  { name: "Students", link: "#" },
  { name: "Contact", link: "/contact" },
];

/** Navbar */
const Navbar: FC = () => {
  return (
    <nav className="w-full absolute z-20 flex justify-between p-6 box-border">
      <div className="flex flex-col justify-center">
        <Link href="/">
          <a>
            <img src="/common/logo-with-text.svg" alt="UW Blueprint logo" />
          </a>
        </Link>
      </div>
      <div className="flex gap-7">
        <div className="flex items-center gap-6">
          {ROUTES.map((route) => (
            <Link key={route.name} href={route.link}>
              <a className="text-sm font-poppins font-normal text-white">
                {route.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
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
  );
};

export default Navbar;
