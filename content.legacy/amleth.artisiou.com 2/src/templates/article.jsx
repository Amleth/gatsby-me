import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'

export default ({ data }) => {
  const article = data.content

  return (
    <Layout>
      <div className="article">
        <h1>{article.title}</h1>
        <div className="info date">Dernière modification : {article.date}</div>
        <div dangerouslySetInnerHTML={{ __html: article.contentHTML }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ArticleQuery($chemin: String!) {
    content(chemin: { eq: $chemin }) {
      contentHTML
      date
      title
    }
  }
`
