import * as React from 'react'
import { Link } from 'gatsby'
import {
  allTagsList,
  body,
  left,
  pageTaggedWith,
  right,
  siteTitle,
  allTagsTagTotalCount
} from './layout.module.css'
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { useTags } from "../hooks/use-tags"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faLink)

const Layout = ({ children, pageTitle, taggedWith }) => {
  const { title } = useSiteMetadata()
  const allTags = useTags()

  return (
    <div className={body}>
      <div className={left}>
        <h1 className={siteTitle}>{title}</h1>
        <ul className={allTagsList}>
          {allTags.map(_ => (
            <li key={_.fieldValue}>
              <Link to={"/tag/" + _.fieldValue}>{_.fieldValue}</Link>{" "}
              <span className={allTagsTagTotalCount}>({_.totalCount})</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={right}>
        <header>
          <h2>{pageTitle}</h2>
          {taggedWith && <div className={pageTaggedWith}>tags: {taggedWith.sort().join(", ")}</div>}
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout