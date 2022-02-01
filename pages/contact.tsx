import { NextPage } from "next";
import Layout from "@components/common/Layout";
import {
  INSTAGRAM_URL,
  FACEBOOK_URL,
  LINKEDIN_URL,
  MEDIUM_URL,
} from "@constants/social-media";

/** Contact us page */
const Contact: NextPage = () => {
  return (
    <Layout hideFooter>
      <div className="bg-blue-100">
        <div className="content min-h-screen py-28 flex flex-col md:flex-row justify-between items-center space-y-16 md:space-y-0 md:space-x-6 ">
          <div className="flex flex-col space-y-8">
            <h1 className="text-white -mb-2">Contact us!</h1>
            <h4 className="max-w-xl text-white font-normal ">
              Have a question? Interested in a potential project but unsure what
              our team can help you with? Send us an email or connect with us on
              our social media!
            </h4>
            <div className="flex items-center space-x-12 md:space-x-16">
              <a href={INSTAGRAM_URL} target="_blank">
                <img
                  className="h-12 w-12"
                  src="/common/instagram-logo.svg"
                  alt="Instagram logo"
                />
              </a>
              <a href={FACEBOOK_URL} target="_blank">
                <img
                  className="h-12 w-12"
                  src="/common/facebook-logo.svg"
                  alt="Facebook logo"
                />
              </a>
              <a href={LINKEDIN_URL} target="_blank">
                <img
                  className="h-12 w-12"
                  src="/common/linkedin-logo.svg"
                  alt="LinkedIn logo"
                />
              </a>
              <a href={MEDIUM_URL} target="_blank">
                <img
                  className="h-12 w-12 relative top-1"
                  src="/common/medium-logo.svg"
                  alt="Medium logo"
                />
              </a>
            </div>
            <a href="mailto:info@uwblueprint.org">
              <h3 className="text-white">info@uwblueprint.org</h3>
            </a>
          </div>
          <div>
            <img src="/contact/say-hello.svg" alt="Woman waving" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
