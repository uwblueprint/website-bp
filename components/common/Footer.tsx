import { FC } from "react";
import {
  INSTAGRAM_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
  MEDIUM_URL,
} from "@constants/social-media";
import Link from "next/link";

const LINKS = [
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "Students",
    link: "/students",
  },
  {
    name: "Join Our Team",
    link: "/join",
  },
  {
    name: "For Nonprofits",
    link: "/nonprofits",
  },
];

/** Footer */
const Footer: FC = () => {
  return (
    <footer className="w-full bg-blue-100 md:bg-gradient-to-r md:from-blue md:to-sky-500">
      <div className="content relative z-10 flex flex-col items-center space-y-20 mx-auto pt-14 pb-6">
        <div className="w-full flex flex-col md:flex-row justify-between items-stretch space-y-24 md:space-y-0 md:space-x-20 mt-4">
          {/* Links */}
          <div className="flex flex-col space-y-5">
            {LINKS.map((linkGroup) => (
              <div key={linkGroup.name}>
                <Link href={linkGroup.link}>
                  <h5 className="text-white">{linkGroup.name}</h5>
                </Link>
              </div>
            ))}
          </div>
          {/* Logo, social media links */}
          <div className="relative flex flex-col justify-between items-start space-y-10">
            <img
              className="h-7"
              src="/common/logo-with-text.svg"
              alt="UW Blueprint logo"
            />
            <div className="relative">
              <img
                className="w-80 -ml-4"
                src="/footer/say-hello.svg"
                alt="Don't be shy, say hello"
              />
              <div className="absolute bottom-0 right-0 flex flex-col space-y-4">
                <a href="mailto:info@uwblueprint.org">
                  <h5 className="text-white">info@uwblueprint.org</h5>
                </a>
                <div className="flex items-center space-x-2">
                  <a href={INSTAGRAM_URL} target="_blank">
                    <img
                      className="h-6 w-6"
                      src="/common/instagram-logo.svg"
                      alt="Instagram logo"
                    />
                  </a>
                  <a href={MEDIUM_URL} target="_blank">
                    <img
                      className="h-6 w-6"
                      src="/common/medium-logo.svg"
                      alt="Medium logo"
                    />
                  </a>
                  <a href={FACEBOOK_URL} target="_blank">
                    <img
                      className="h-6 w-6"
                      src="/common/facebook-logo.svg"
                      alt="Facebook logo"
                    />
                  </a>
                  <a href={LINKEDIN_URL} target="_blank">
                    <img
                      className="h-6 w-6"
                      src="/common/linkedin-logo.svg"
                      alt="LinkedIn logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <h5 className="text-white font-semibold">
          © UW Blueprint {new Date().getFullYear()}
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
