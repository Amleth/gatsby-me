import { graphql, Link } from "gatsby"
import React from "react"
import Layout from "../components/layout"

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
            chemin
          }
        }
      }
    }
  }
`

function C ({ pageContext, data }) {
  const { tag } = pageContext
  return (
    <Layout>
      <h2>tagged with "{tag}":</h2>
      <ul>
        {data.allYaml.edges.map(node => (
          <li key={node.node.id}>
            <Link to={"/data/" + node.node.fields.chemin}>
              {node.node.fields.chemin}
            </Link>{" "}
            <span className="taggedWith">
              (tagged with: {node.node.tags.sort().join(", ")})
            </span>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default C