import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"

let k = 0

function makeLinks(item, getSubLinksLabel = false) {
  const links = []

  for (const u of ['u', 'url']) {
    if (item.hasOwnProperty(u)) {
      links.push(<a key={k++} href={item[u]} target="_blank" rel="noreferrer">
        <i className="fa fa-link"></i>
        {getSubLinksLabel && item.hasOwnProperty('l') && <span className="linkText">({item.l})</span>}
      </a>)
    }
  }
  if (item.hasOwnProperty("bc"))
    links.push(
      <a key={k++} href={item.bc} target="_blank" rel="noreferrer">
        <i className="fab fa-bandcamp"></i>
      </a>
    )
  if (item.hasOwnProperty("in"))
    links.push(
      <a key={k++} href={item.in} target="_blank" rel="noreferrer">
        <i className="fab fa-instagram"></i>
      </a>
    )
  if (item.hasOwnProperty("sc"))
    links.push(
      <a key={k++} href={item.sc} target="_blank" rel="noreferrer">
        <i className="fab fa-soundcloud"></i>
      </a>
    )
  if (item.hasOwnProperty("sp"))
    links.push(
      <a key={k++} href={item.sp} target="_blank" rel="noreferrer">
        <i className="fab fa-spotify"></i>
      </a>
    )
  if (item.hasOwnProperty("wp"))
    links.push(
      <a key={k++} href={item.wp} target="_blank" rel="noreferrer">
        <i className="fab fa-wikipedia-w"></i>
      </a>
    )
  if (item.hasOwnProperty('links'))
    for (const link of item.links)
      links.push(makeLinks(link, true))

  if (links.length > 0)
    return links
}

function makeContent(c, depth) {
  const content = []

  if (c.hasOwnProperty("t")) {
    switch (depth) {
      case 1:
        content.push(<h3 key={k++}>{c.t}</h3>)
        break
      case 2:
        content.push(<h4 key={k++}>{c.t}</h4>)
        break
      case 3:
        content.push(<h5 key={k++}>{c.t}</h5>)
        break
      case 4:
        content.push(<h6 key={k++}>{c.t}</h6>)
        break
      default:
    }

    c.hasOwnProperty("i") &&
      content.push(
        <ul key={k++}>
          {c.i.map(item => {
            return (
              <li key={k++}>
                <span>{item.l}</span>
                <span key={k++} className="links">
                  {makeLinks(item)}
                </span>
                {item.hasOwnProperty("i") && (
                  <ul key={k++}>
                    {item.i.map(subitem => {
                      return (
                        <li key={k++}>
                          <a href={subitem.u} target="_blank" rel="noreferrer">
                            {subitem.l || subitem.u}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      )

    if (c.hasOwnProperty("s"))
      for (const s of c.s) {
        content.push(...makeContent(s, depth + 1))
      }
  }

  return content
}

function C ({ data }) {
  const content = JSON.parse(data.yaml.fields.json)
  return (
    <Layout>
      <h2>{data.yaml.title}</h2>
      <div className="tags">tags: {data.yaml.tags.sort().join(", ")}</div>
      <div>{makeContent(content, 0)}</div>
    </Layout>
  )
}

export const query = graphql`
  query DataQuery($chemin: String) {
    yaml(fields: { chemin: { eq: $chemin } }) {
      title
      tags
      fields {
        json
      }
    }
  }
`

export default C