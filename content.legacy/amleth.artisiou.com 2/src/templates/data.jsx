import { graphql } from 'gatsby'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Layout from '../components/layout'

const getUrlName = _ => {
  _ = _.replace(/https?:\/\//, '')
  if (_ && _[_.length - 1] === '/') _ = _.substring(0, _.length - 1)

  return _
}

const fa_bc = ['fab', 'bandcamp']
const fa_gh = ['fab', 'github']
const fa_medium = ['fab', 'medium']
const fa_sc = ['fab', 'soundcloud']
const fa_tw = ['fab', 'twitter']
const fa_vi = ['fab', 'vimeo']
const fa_yt = ['fab', 'youtube']
const fa_url = ['fas', 'link']
const fa_wp = ['fab', 'wikipedia']
const type2faicon = {
  bandcamp: fa_bc,
  bc: fa_bc,
  github: fa_gh,
  gh: fa_gh,
  medium: fa_medium,
  soundcloud: fa_sc,
  sc: fa_sc,
  twitter: fa_tw,
  tw: fa_tw,
  youtube: fa_yt,
  yt: fa_yt,
  url: fa_url,
  vimeo: fa_vi,
  vi: fa_vi,
  wp: fa_wp,
}

const renderPart = (part, level) => {
  let TitleTag = `h${level}`

  return [
    <TitleTag key={'h-' + part.title}>{part.title}</TitleTag>,
    part.parts && part.parts.map(_ => renderPart(_, level + 1)),
    part.items && (
      <ul className="items" key={'ul-' + part.title}>
        {part.items.map(renderItem)}
      </ul>
    ),
  ]
}

const renderItem = item => {
  // State
  const { title, url, bc, gh, medium, sc, tw, vi, yt, wp, links, items } = item
  const has_inline_known_link = bc || sc || tw || vi || yt || wp ? true : false
  const display_title = title && (has_inline_known_link || !url || links)
  const display_title_as_link = title && url && !has_inline_known_link && !links
  const display_url = !title && url
  const display_url_as_inline_link =
    title && url && (has_inline_known_link || links)

  // Publishing metadata (author, date)
  let publishing_metadata = []
  item.author && publishing_metadata.push(item.author)
  item.date && publishing_metadata.push(item.date)
  publishing_metadata = publishing_metadata.join(', ')

  const makeInlineLinks = (type, url) => {
    const faicon = type2faicon[type]
    return (
      <a
        className="inline-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {<FontAwesomeIcon icon={[faicon[0], faicon[1]]} />}
      </a>
    )
  }

  const makeSubLink = ({ title, type, url }) => {
    if (!url) return <li key={url || title}>{title}</li>

    if (!type)
      return (
        <li key={url || title}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title || getUrlName(url)}
          </a>
        </li>
      )

    const faicon = type2faicon[type]
    return (
      <li key={url || title}>
        <a
          className="sub-inline-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {<FontAwesomeIcon icon={[faicon[0], faicon[1]]} />} {title}
        </a>
      </li>
    )
  }

  return (
    <li key={url || title}>
      {display_title && title}
      {display_title_as_link && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      )}
      {display_url && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {getUrlName(url)}
        </a>
      )}
      {publishing_metadata && (
        <span className="publishing_metadata">
          &nbsp;({publishing_metadata})
        </span>
      )}
      {display_url_as_inline_link && makeInlineLinks('url', url)}
      {bc && makeInlineLinks('bc', bc)}
      {gh && makeInlineLinks('gh', gh)}
      {gh && makeInlineLinks('medium', medium)}
      {sc && makeInlineLinks('sc', sc)}
      {tw && makeInlineLinks('tw', tw)}
      {vi && makeInlineLinks('vi', vi)}
      {yt && makeInlineLinks('yt', yt)}
      {wp && makeInlineLinks('wp', wp)}
      {links && <ul>{links.map(makeSubLink)}</ul>}
      {items && <ul className="items">{items.map(renderItem)}</ul>}
    </li>
  )
}

export default ({ data }) => {
  const { title, contentYAML } = data.content
  const { items, parts } = contentYAML

  return (
    <Layout>
      <div className="article">
        <h1>{title}</h1>
        {items && <ul className="items">{items.map(renderItem)}</ul>}
        {parts && parts.map(p => renderPart(p, 2))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query DataQuery($chemin: String!) {
    content(chemin: { eq: $chemin }) {
      title
      contentYAML {
        items {
          title
          url
          author
          date
          bc
          sc
          tw
          vi
          yt
          wp
          links {
            title
            type
            url
          }
        }
        parts {
          title
          items {
            title
            url
            author
            date
            bc
            sc
            tw
            vi
            yt
            wp
            links {
              title
              type
              url
            }
            items {
              title
              url
              author
              date
              bc
              sc
              tw
              vi
              yt
              wp
              links {
                title
                type
                url
              }
            }
          }
          parts {
            title
            items {
              title
              url
              author
              date
              bc
              sc
              tw
              vi
              yt
              wp
              links {
                title
                type
                url
              }
            }
          }
        }
      }
    }
  }
`
