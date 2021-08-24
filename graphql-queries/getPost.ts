import { PostsDocument } from "../.tina/__generated__/types";

export const getPostQuery = `#graphql
  query getBlogPostQuery($relativePath: String!) {
    getPostsDocument(relativePath: $relativePath){
    id
    sys {
      filename
    }
    data {
      title
      minRead
      date
      tags
      body
      author {
        __typename
        ... on AuthorDocument {
          data {
            name
            avatar
          }
        }
      }
      blocks {
        __typename
        ... on PostsBlocksLongFormText {
          content
        }
        __typename
        ... on PostsBlocksIframe {
          url
        }
        __typename
        ... on PostsBlocksImg {
          img
        }
      }
      featuredPosts {
        edges {
          __typename
          ... on PostsFeaturedPostsConnectionEdges {
            node {
              __typename
              ... on PostsDocument {
                id
                data {
                  title
                  minRead
                  date
                  description
                  author {
                    __typename
                    ... on AuthorDocument {
                      data {
                        name
                        avatar
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export type getPostQueryRes = {
  getPostsDocument: PostsDocument;
};
