import { GetStaticProps } from "next";
import React from "react";
import { BreadCrumb } from "../../components/BreadCrumb";
import Layout from "../../components/layout/Layout";
import { ProjectCard } from "../../components/ProjectCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export interface Projects {
  url?: string;
  label: string;
  excerpt: string;
  slug: string;
  imgUrl?: string;
  fromGithub?: boolean;
  rawMarkdown?: string;
}
const ProjectPage: React.FC<{ projects: Projects[]; preview: boolean }> = (
  props
) => {
  return (
    <Layout preview={props.preview} title="Projects">
      <div className="max-w-screen-lg mx-auto">
        <BreadCrumb links={[{ label: "Projects", href: "/projects" }]} />
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {props.projects?.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = require("../../content/projects.json");

  return {
    props: {
      projects: data.projects,
      preview: ctx.preview ?? false,
    },
  };
};

export default ProjectPage;
