import * as React from 'react'
import { Link } from 'gatsby'
import {
  body,
  left,
  right,
  siteTitle,
  tagTotalCount
} from './layout.module.css'
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useTags } from "../hooks/use-tags"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faLink)

const Layout = ({ pageTitle, children }) => {
  const { title } = useSiteMetadata()
  const tags = useTags()

  return (
    <div className={body}>
      <nav className={left}>
        <h1 className={siteTitle}>{title}</h1>
        <div>
          <ul>
            {tags.map(_ => (
              <li key={_.fieldValue}>
                <Link to={"/tag/" + _.fieldValue}>{_.fieldValue}</Link>{" "}
                <span className={tagTotalCount}>({_.totalCount})</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className={right}>
        <h2>{pageTitle}</h2>
        {children}
      </main>
    </div>
  )
}

export default Layout