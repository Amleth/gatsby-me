// https://github.com/gatsbyjs/gatsby/issues/24902

import { graphql, Link, useStaticQuery } from "gatsby"
import Helmet from "react-helmet"
import React from "react"

function C({ children }) {
  const data = useStaticQuery(graphql`
    query Tags {
      allYaml(filter: { fields: { published: { eq: true } } }) {
        group(field: tags) {
          fieldValue
          totalCount
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: "description", content: "Amleth" },
          { name: "keywords", content: "music, synths" },
        ]}
      />
      <div className="body">
        <div className="left">
          <h1>{data.site.siteMetadata.title}</h1>
          <div>
            <ul>
              {data.allYaml.group.map(_ => (
                <li key={_.fieldValue}>
                  <Link to={"/tag/" + _.fieldValue}>{_.fieldValue}</Link>{" "}
                  <span className="tagTotalCount">({_.totalCount})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right">{children}</div>
      </div>
    </>
  )
}

export default C