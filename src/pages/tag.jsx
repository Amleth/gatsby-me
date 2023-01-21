import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import "./tag.module.css"

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allYaml(filter: { tags: { in: [$tag] } }) {
      totalCount
      edges {
        node {
          id
          tags
          title
          fields {
            slug
          }
        }
      }
    }
  }
`

export default function C({ pageContext, data }) {
  const { tag } = pageContext
  return (
    <Layout pageTitle={"tagged with " + tag}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
            <th>Tagged with</th>
          </tr>
        </thead>
        <tbody>
          {data.allYaml.edges.map(node => (
            <tr key={node.node.id}>
              <td>
                {node.node.title}
              </td>
              <td>
                <Link to={"/" + node.node.fields.slug}>
                  /{node.node.fields.slug}
                </Link>
              </td>
              <td>
                {node.node.tags.sort().join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ Layout>
  )
}