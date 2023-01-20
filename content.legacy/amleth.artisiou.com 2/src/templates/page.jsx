import { graphql } from 'gatsby'
import React from 'react';

import Layout from '../components/layout'

export default ({ data }) => {
  const content = data.content;
  return (
    <Layout>
      <div className="article">
        <h1>{content.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.contentHTML }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PageQuery($chemin: String!) {
    content(chemin: { eq: $chemin }) {
      contentHTML
      title
    }
  }
`;
