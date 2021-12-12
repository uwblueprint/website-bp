import { NextPage } from "next";
import Layout from "@components/common/Layout";
import Hero from "@components/projects/Hero";
import HighlightedProjects from "@components/projects/HighlightedProjects";
import OtherProjects from "@components/projects/OtherProjects";

/** Projects page */
const Projects: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <HighlightedProjects />
      <OtherProjects />
    </Layout>
  );
};

export default Projects;
