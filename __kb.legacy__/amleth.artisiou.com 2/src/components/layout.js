import { StaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'
import lodash from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import 'typeface-im-fell-english'
import 'typeface-im-fell-dw-pica'
import './layout.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fab, fas)

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
        allContent(filter: { published: { ne: false } }) {
          group(field: tags) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Amleth' },
            { name: 'keywords', content: 'music, china, synths, osr' },
          ]}
        />
        <div id="leftbg" />
        <div id="left">
          <ul id="tags">
            <span className="info">TAGS</span>
            {data.allContent.group.map(_ => (
              <li key={_.fieldValue}>
                <Link to={`/tag/${lodash.kebabCase(_.fieldValue)}`}>
                  {_.fieldValue}
                </Link>
                &nbsp;&nbsp;<span className="info">{_.totalCount}</span>
              </li>
            ))}
          </ul>
        </div>
        <div id="right">{children}</div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
