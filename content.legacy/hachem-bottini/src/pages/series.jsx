import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";

const Series = ({ data }) => {
  return (
    <Layout pageTitle={"Séries"}>
      <ul>
        {data.allMdx.nodes.map((node) => {
          return (
            <li key={node.slug}>
              <Link to={`/series/${node.slug}`}>
                {node.slug.substring(0, 10)}&nbsp;&nbsp;⬡&nbsp;&nbsp;
                {node.slug.substring(11, 13)}
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: slug, order: DESC }) {
      nodes {
        frontmatter {
          title
        }
        body
        slug
      }
    }
  }
`;

export default Series;
