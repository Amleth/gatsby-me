import { useStaticQuery, graphql } from "gatsby"

export const useTags = () => {
  const { allYaml } = useStaticQuery(
    graphql`
      query Tags {
        allYaml(filter: { fields: { published: { eq: true } } }) {
          group(field: {tags: SELECT}) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )
  return allYaml.group
}