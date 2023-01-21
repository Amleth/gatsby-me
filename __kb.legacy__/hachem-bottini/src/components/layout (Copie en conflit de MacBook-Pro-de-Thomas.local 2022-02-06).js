import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    return <div>
        <span>{data.site.siteMetadata.title}</span>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/diptyques">Diptyques</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
        <main>
            <h1>{pageTitle}</h1>
            {children}
        </main>
    </div>
}

export default Layout