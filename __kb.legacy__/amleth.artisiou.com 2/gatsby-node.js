const crypto = require(`crypto`)
const fs = require('fs')
const matter = require('gray-matter')
const html = require('remark-html')
const lodash = require('lodash')
const markdown = require('remark-parse')
const path = require('path')
const unified = require('unified')
const yaml = require('js-yaml')

const { TYPE_ARTICLE, TYPE_PAGE, TYPE_DATA } = require('./src/_content/_')

const getMarkdownPath = (fileNode) => {
  let itemname = null
  let date = null

  const parts = fileNode.name.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})-(.*)/)

  if (!parts) {
    itemname = fileNode.name
  } else {
    date = parts[1]
    itemname = parts[2]
  }

  return {
    chemin: fileNode.relativeDirectory + '/' + itemname,
    date,
    itemname,
    published: !fileNode.base.startsWith('_'),
  }
}
const makeContentNode = (
  createNode,
  node,
  chemin,
  contentHTML,
  contentYAML,
  date,
  published,
  tags,
  title,
  type
) => {
  const contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(node))
    .digest(`hex`)
  if (type === 'DATA') {
  }
  const n = createNode({
    children: [],
    id: `${node.absolutePath || node.fileAbsolutePath}—CONTENT`,
    internal: {
      contentDigest,
      type: `content`,
    },
    parent: node.id,
    chemin,
    contentHTML,
    contentYAML,
    date,
    published,
    tags,
    title,
    type,
  })
}

const dir2type = { articles: TYPE_ARTICLE, pages: TYPE_PAGE }

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createParentChildLink } = actions

  switch (node.extension) {
    case 'md':
      const { chemin, date, itemname, published } = getMarkdownPath(node)
      const gm = matter(fs.readFileSync(node.absolutePath, 'utf8'))
      unified()
        .use(markdown)
        .use(html)
        .process(gm.content, (err, file) => {
          if (err) throw err

          const contentHTML = String(file)
          makeContentNode(
            createNode,
            node,
            chemin,
            contentHTML,
            null,
            date,
            published,
            gm.data.tags,
            gm.data.title,
            dir2type[chemin.split('/')[0]]
          )
        })
      break
    case 'yml':
    case 'yaml':
      console.log(node.absolutePath)
      const content = yaml.safeLoad(fs.readFileSync(node.absolutePath, 'utf8'))
      const tags = content.tags
      const title = content.title
      delete content.tags
      delete content.title

      makeContentNode(
        createNode,
        node,
        node.relativeDirectory.replace('\\', '/') + '/' + node.name,
        null,
        content,
        null,
        !node.base.startsWith('_'),
        tags,
        title,
        TYPE_DATA
      )

      break
  }
}

const type2component = {
  [TYPE_DATA]: path.resolve(`./src/templates/data.jsx`),
  [TYPE_ARTICLE]: path.resolve(`./src/templates/article.jsx`),
  [TYPE_PAGE]: path.resolve(`./src/templates/page.jsx`),
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContent {
          edges {
            node {
              chemin
              tags
              type
            }
          }
        }
      }
    `).then((result) => {
      result.data.allContent.edges.forEach(({ node }) => {
        createPage({
          component: type2component[node.type],
          path: node.chemin,
          context: {
            chemin: node.chemin,
            type: node.type,
          },
        })
      })

      //
      // TAGS
      //
      let all_tags = []
      const edges = result.data.allContent.edges
      edges.map((_) => {
        const { node } = _
        const { tags } = node
        if (!tags) return
        all_tags = all_tags.concat(tags)
      })
      all_tags = lodash.uniq(all_tags)
      all_tags = lodash.sortBy(all_tags)
      all_tags.map((tag) => {
        createPage({
          path: `/tag/${lodash.kebabCase(tag)}`,
          component: path.resolve('src/templates/tag.jsx'),
          context: { tag },
        })
      })

      resolve()
    })
  })
}
