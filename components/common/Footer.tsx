import { FC } from "react";

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
    <footer className="w-full relative z-10 flex flex-col items-center gap-20 pt-14 pb-6 bg-gradient-to-r from-blue to-sky-400">
      <div className="flex justify-center items-stretch gap-24">
        {/* Logo, social media links */}
        <div className="relative flex flex-col justify-between items-start">
          <img className="h-7" src="/common/logo.svg" alt="UW Blueprint logo" />
          <img src="/footer/say-hello.svg" alt="Don't be shy, say hello" />
          <div className="absolute bottom-0 right-0 flex flex-col gap-4">
            <a href="mailto:info@uwblueprint.org">
              <h5 className="text-white">info@uwblueprint.org</h5>
            </a>
            <div className="flex items-center gap-2">
              <a href="/">
                <img
                  className="h-6 w-6"
                  src="/common/instagram-logo.svg"
                  alt="instagram"
                />
              </a>
              <a href="/">
                <img
                  className="h-6 w-6"
                  src="/common/medium-logo.svg"
                  alt="medium"
                />
              </a>
              <a href="/">
                <img
                  className="h-6 w-6"
                  src="/common/facebook-logo.svg"
                  alt="facebook"
                />
              </a>
              <a href="/">
                <img
                  className="h-6 w-6"
                  src="/common/linkedin-logo.svg"
                  alt="linkedin"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          {LINKS.map((linkGroup) => (
            <div key={linkGroup.name}>
              <a href={linkGroup.link}>
                <h5 className="text-white mb-5">{linkGroup.name}</h5>
              </a>
              <div className="flex flex-col gap-3">
                {linkGroup.children.map((child) => (
                  <a key={child.name} className="text-white" href={child.link}>
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
    </footer>
  );
};

export default Footer;
