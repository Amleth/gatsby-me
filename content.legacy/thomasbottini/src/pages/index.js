import { Link, graphql } from "gatsby";
import * as React from "react";

const IndexPage = ({ data }) => {
  return (
    <main>
      <h2>Galeries</h2>
      <ul>
        {data.allMdx.nodes.map((g) => (
          <React.Fragment key={g.id}>
            <li>
              <Link to={`/series/${g.slug}`}>
                {g.frontmatter.title} ({g.frontmatter.date})
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </main>
  );
};

export const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          title
          date
        }
        id
        slug
      }
    }
  }
`;

export default IndexPage;
