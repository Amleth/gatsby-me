import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { content, links, linkText, rubElHizb } from './{Yaml.fields__slug}.module.css'

let k = 0

function makeLinks(item, getSubLinksLabel = false) {
  const links = []

  if (item.hasOwnProperty("bc"))
    links.push(
      <a key={k++} href={item.bc} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'bandcamp']} />
      </a>
    )
  if (item.hasOwnProperty("in"))
    links.push(
      <a key={k++} href={item.in} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'instagram']} />
      </a>
    )
  if (item.hasOwnProperty("sc"))
    links.push(
      <a key={k++} href={item.sc} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'soundcloud']} />
      </a>
    )
  if (item.hasOwnProperty("sp"))
    links.push(
      <a key={k++} href={item.sp} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'spotify']} />
      </a>
    )
  if (item.hasOwnProperty("wp"))
    links.push(
      <a key={k++} href={item.wp} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'wikipedia-w']} />
      </a>
    )
  if (item.hasOwnProperty("yt"))
    links.push(
      <a key={k++} href={item.yt} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={['fab', 'youtube']} />
      </a>
    )
  if (item.hasOwnProperty('links'))
    for (const link of item.links)
      links.push(makeLinks(link, true))

  if (item.hasOwnProperty("u")) {
    let linkLabel = item.l
    links.unshift(<a key={k++} href={item.u} target="_blank" rel="noreferrer">
      {
        item.l
          ? <><FontAwesomeIcon icon="link" />{getSubLinksLabel && <span className={linkText}>({linkLabel})</span>}</>
          : <span className={linkText}>{item.u}</span>
      }
    </a>)
  }

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
                <span key={k++} className={links}>
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

export default function C({ data }) {
  const userContent = JSON.parse(data.yaml.fields.json)
  return (
    <Layout pageTitle={data.yaml.title} taggedWith={data.yaml.tags}>
      <div className={content}>{makeContent(userContent, 0)}</div>
      <div className={rubElHizb}>۞</div>
    </Layout>
  )
}


export const query = graphql`
  query($id: String) {
    yaml(id: { eq: $id }) {
      title
      tags
      fields {
        json
        slug
      }
    }
  }
`