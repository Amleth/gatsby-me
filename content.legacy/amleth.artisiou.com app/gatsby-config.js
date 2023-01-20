/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `ي`,
    siteUrl: `http://amleth.artisiou.com`,
    description: `Me.`,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-yaml`,
      options: { typeName: `Yaml` },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ],
}
