import { useRouter } from "next/router";
import React from "react";
import { GithubClient } from "react-tinacms-github";
import {
  TinaCloudAuthWall,
  useGraphqlForms,
  useDocumentCreatorPlugin,
} from "tina-graphql-gateway";
import { TinaCMS } from "tinacms";
import { createClient } from "../utils";
import { useExitTina, useSetupPlugins } from "../utils/tinacms";

export const TinaWrapper: React.FC<any> = (props) => {
  console.log({ props });
  const cms = React.useMemo(
    () =>
      new TinaCMS({
        toolbar: true,
        apis: {
          tina: createClient(),
          github: new GithubClient({
            proxy: "/api/proxy-github",
            authCallbackRoute: "/api/create-github-access-token",
            clientId: process.env.GITHUB_CLIENT_ID || "err",
            baseRepoFullName: process.env.REPO_FULL_NAME || "err", // e.g: tinacms/tinacms.org,
            baseBranch: process.env.BASE_BRANCH || "err",
          }),
        },
        sidebar: {
          buttons: {
            save: `Publish`,
            reset: `Reset`,
          },
        },
        enabled: true,
      }),
    []
  );

  return (
    <TinaCloudAuthWall cms={cms}>
      {/* this is to prevent from trying to query non editable pages */}
      {props.query ? <Inner {...props} /> : props.children(props)}
    </TinaCloudAuthWall>
  );
};

const Inner = (props: any) => {
  const router = useRouter();
  const [payload, isLoading] = useGraphqlForms({
    query: (gql) => gql(props.query || ""),
    variables: props.variables || {},
    formify: ({ createForm, formConfig }) => {
      // this doesnt feel right
      formConfig.fields?.forEach((field) => {
        if (field.name === "_body") {
          field.component = "markdown";
        }
      });
      return createForm(formConfig);
    },
  });
  // sets up date and markdown plugin
  useSetupPlugins();
  // sets up a event listener that exits tina the way with using global state
  useExitTina();
  // creates documents
  useDocumentCreatorPlugin((args) => {
    console.log({ args });

    switch (args.collection.slug) {
      case "posts":
        router.push(`/blog/${args.relativePath.replace(".md", "")}`);
    }
  });
  return (
    <>
      {isLoading ? (
        <div
          style={{
            opacity: 0.2,
            pointerEvents: "none",
          }}
        >
          {props.children(props)}
        </div>
      ) : (
        // pass the new edit state data to the child
        props.children({ ...props, data: payload })
      )}
    </>
  );
};
export default TinaWrapper;