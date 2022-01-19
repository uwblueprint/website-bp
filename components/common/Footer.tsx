import { FC } from "react";
import {
  INSTAGRAM_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
  MEDIUM_URL,
} from "@constants/social-media";

const LINKS = [
  {
    name: "About Us",
    children: [
      { name: "Who We Are", link: "/" },
      { name: "What We Do", link: "/" },
      { name: "History", link: "/" },
      { name: "Community", link: "/" },
      { name: "Our Process", link: "/" },
    ],
    link: "/about",
  },
  {
    name: "Projects",
    children: [
      { name: "Featured", link: "/" },
      { name: "Current", link: "/" },
      { name: "Archive", link: "/" },
    ],
    link: "/projects",
  },
  {
    name: "Students",
    children: [
      { name: "Meet the Team", link: "/" },
      { name: "Alumni", link: "/" },
    ],
    link: "/students",
  },
  {
    name: "Join Our Team",
    children: [
      { name: "Why Join", link: "/" },
      { name: "What We Look For", link: "/" },
      { name: "Application Process", link: "/" },
      { name: "FAQ", link: "/" },
      { name: "Apply", link: "/" },
    ],
    link: "/join",
  },
  {
    name: "For Nonprofits",
    children: [
      { name: "Our Services", link: "/" },
      { name: "Decision Criteria", link: "/" },
      { name: "Timeline", link: "/" },
      { name: "FAQ", link: "/" },
      { name: "Apply", link: "/" },
    ],
    link: "/nonprofits",
  },
];

/** Footer */
const Footer: FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue to-sky-500">
      <div className="content relative z-10 flex flex-col items-center space-y-20 mx-auto pt-14 pb-6">
        <div className="flex justify-center items-stretch space-x-20">
          {/* Logo, social media links */}
          <div className="relative flex flex-col justify-between items-start">
            <img
              className="h-7"
              src="/common/logo-with-text.svg"
              alt="UW Blueprint logo"
            />
            <img src="/footer/say-hello.svg" alt="Don't be shy, say hello" />
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

          {/* Links */}
          <div className="flex space-x-12">
            {LINKS.map((linkGroup) => (
              <div key={linkGroup.name}>
                <a href={linkGroup.link}>
                  <h5 className="text-white mb-5">{linkGroup.name}</h5>
                </a>
                <div className="flex flex-col space-y-3">
                  {linkGroup.children.map((child) => (
                    <a
                      key={child.name}
                      className="text-white"
                      href={child.link}
                    >
                      <p>{child.name}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <h5 className="text-white font-semibold">© UW Blueprint 2021</h5>
      </div>
    </footer>
  );
};

export default Footer;
