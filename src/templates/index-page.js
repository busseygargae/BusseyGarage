import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import LogoGrid from "../components/LogoGrid";
import ContactForm from "../components/ContactForm";
import { relative } from "upath";

// $bussey-orange: #e2761e
const busseyOrange = "rgb(226, 119, 30)";
// $bussey-orange-invert: #128888
// $body-color: #162125
// $black: #242827

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro
}) => {
  const headerHeight = "400px";
  return (
    <div>
      <div
        className="full-width-image margin-top-0"
        style={{
          height: headerHeight,
          position: "relative"
        }}
      >
        <div
          style={{
            height: headerHeight,
            width: "100vw",
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
            backgroundPosition: `top left`,
            backgroundAttachment: `fixed`
          }}
        />
        <div
          className="overlay"
          style={{
            height: headerHeight,
            width: "100vw",
            backgroundImage: `url(${
              !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
            backgroundPosition: `top left`,
            backgroundAttachment: `fixed`,
            maskImage: "linear-gradient(transparent, rgba(0, 0, 0, 1.0))",
            filter: "blur(5px)"
          }}
        />
        <div className="overlay content">{title}</div>
      </div>

      <section>
        <h1 className="title">{mainpitch.title}</h1>
        <h3 className="subtitle">{mainpitch.description}</h3>
      </section>

      <section>
        <h3 className="title has-text-weight-semibold is-size-2">{heading}</h3>
        <p>{description}</p>
      </section>

      <section>
        <h3 className="title">Expertise</h3>
        <p>expert stuff</p>
      </section>

      <LogoGrid gridItems={intro.blurbs} />

      <ContactForm />
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  console.log(frontmatter);

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
