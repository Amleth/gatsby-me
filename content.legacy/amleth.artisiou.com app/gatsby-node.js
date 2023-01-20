const lodash = require("lodash")
const path = require("path")

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom",
        },
      },
    })
  }
}

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
      name: `chemin`,
      value: node.slug || lodash.deburr(
        parentNode.relativeDirectory.split("/").slice(1).join("-") +
        "-" +
        parentNode.name
      ),
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
              chemin
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
      createPage({
        path: `/data/${lodash.kebabCase(edge.node.fields.chemin)}`,
        component: path.resolve("src/templates/data.jsx"),
        context: {
          chemin: edge.node.fields.chemin,
        },
      })
    })
    tagSet.forEach(tag => {
      createPage({
        path: `/tag/${lodash.kebabCase(tag)}`,
        component: path.resolve("src/templates/tag.jsx"),
        context: { tag },
      })
    })
  })
}
