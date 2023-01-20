import { graphql } from 'gatsby'
import Link from 'gatsby-link';
import lodash from 'lodash';
import React from 'react';

import Layout from '../components/layout'

export default ({ data }) => {
  const articles = lodash.reverse(lodash.sortBy(data.allContent.edges.map(_ => _.node), 'date'));
  if (articles.length === 0) return <div className="nothing">Nothing.</div>;

  return (
    <Layout>
      <h1>Articles ({articles.length})</h1>
      {articles.map(article => (
        <div key={article.chemin} className="item-in-listing">
          <Link to={`/${article.chemin}`}>{article.title}</Link>
          <div className="date">{article.date}</div>
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query ArticlesQuery {
    allContent(filter: { type: { eq: "ARTICLE" } }) {
      totalCount
      edges {
        node {
          chemin
          date
          title
          type
        }
      }
    }
  }
`;
