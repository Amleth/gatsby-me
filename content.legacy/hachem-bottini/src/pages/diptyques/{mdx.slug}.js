import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from '../../components/layout'
import { images } from './{mdx.slug}.module.css'

const Diptyque = ({ data }) => {
  const n = getImage(data.mdx.frontmatter.n)
  const t = getImage(data.mdx.frontmatter.t)
  return <Layout pageTitle={data.mdx.frontmatter.title}>
    <div className={images}>
      <GatsbyImage image={n} alt="nancy" />
      <GatsbyImage image={t} alt="thomas" />
    </div>
    <MDXRenderer>
      {data.mdx.body}
    </MDXRenderer>
  </Layout>
}

export const query = graphql`
  query($slug: String) {
    mdx(slug: {eq: $slug}) {
      frontmatter {
        title
        n {
          childImageSharp {
            gatsbyImageData
          }
        }
        t {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
      slug
    }
  }
`

export default Diptyque

