const path = require(`path`)
const lodash = require('lodash')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Yaml") {
    const parentNode = getNode(node.parent)
    createNodeField({
      node,
      name: `published`,
      value: !parentNode.base.startsWith("_"),
    })
    createNodeField({
      node,
      name: `slug`,
      value: parentNode.name,
    })
    createNodeField({
      node,
      name: `json`,
      value: JSON.stringify({ t: node.title, i: node.i, s: node.s }),
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const tagSet = new Set()
  const { createPage } = actions
  return graphql(`
    query {
      allYaml {
        edges {
          node {
            fields {
              slug
            }
            tags
          }
        }
      }
    }
  `).then(result => {
    result.data.allYaml.edges.forEach(edge => {
      edge.node.tags.forEach(tag => {
        tagSet.add(tag)
      })
    })
    tagSet.forEach(tag => {
      createPage({
        path: `/tag/${lodash.kebabCase(tag)}`,
        component: path.resolve("src/pages/tag.jsx"),
        context: { tag },
      })
    })
  })
}