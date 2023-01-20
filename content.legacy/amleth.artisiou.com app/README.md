# Amleth database

## YAML data structure

A .yaml file:

    title (which will be injected as "t" in `gatsby-node.js`)
    tags
    i (items)
    s (sections)

An item:
    - url
    - l? (label)
    - d? (date)
    - i? (items)
    - bc? (bandcamp url)
    - fb? (facebook url)
    - in? (instagram url)
    - sc? (soundcloud url)
    - sp? (spotify url)
    - tw? (twitter url)
    - vi? (vimeo url)
    - yt? (youtube url)

A section:
    - t (title)
    - i? (items)
    - s? (sub-sections)

## YAML data abbrv