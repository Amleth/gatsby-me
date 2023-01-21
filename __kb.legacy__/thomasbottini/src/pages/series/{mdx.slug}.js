import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as React from "react";
import { gallery } from "./{mdx.slug}.module.css";

const Serie = ({ data }) => {
  return (
    <div>
      <h2>{data.mdx.frontmatter.title}</h2>
      <div className={gallery}>
        {data.mdx.frontmatter.files.map((i) => {
          const image = getImage(i);
          console.log(image.images.fallback.src);
          const key = Math.random();
          return (
            <a
              href={i.childImageSharp.gatsbyImageData.images.fallback.src}
              target="_blank"
            >
              <GatsbyImage
                alt={key.toString()}
                image={i.childImageSharp.gatsbyImageData}
                key={key}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default Serie;

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        files {
          relativePath
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`;
