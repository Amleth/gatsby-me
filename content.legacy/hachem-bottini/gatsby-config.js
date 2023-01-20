module.exports = {
    siteMetadata: {
        siteUrl: `https://www.hachem-bottini.com`,
        title: `Hachem ⬡ Bottini`
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `diptyques`,
                path: `${__dirname}/src/data/diptyques/`,
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-mdx`,
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: ['Jost']
                }
            }
        }
    ]
}