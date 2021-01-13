import Link from "next/link";
import React from "react";
import { Projects } from "../pages/projects";

export const ProjectCard: React.FC<{ project: Projects }> = ({ project }) => {
  const hasImg = Boolean(project.imgUrl);
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="transition duration-500 ease-in-out transform  hover:scale-105 hover:underline cursor-pointer color-blue my-6">
        <div className={`grid ${hasImg && "md:grid-cols-2"} gap-5`}>
          <div>
            <h2>{project.label}</h2>
            <div>{project.excerpt}</div>
          </div>
          <div>
            {project.imgUrl && <img src={project.imgUrl} alt="image" />}
          </div>
        </div>

        {/* divider */}
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-sm text-gray-500 my-auto">
              See more{" "}
              <span
                className="text-2xl"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              >
                &#8680;
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
