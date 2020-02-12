import { graphql } from "gatsby";

export const NavMenu = graphql`
  fragment NavMenu on SanityNavigationMenu {
    items {
      title
      kind
      link
      internalLink {
        ... on SanityPost {
          _type
          slug {
            current
          }
        }
        ... on SanityRoute {
          id
          _type
          slug {
            current
          }
        }
      }
    }
  }
`;
