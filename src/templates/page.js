import React from "react";
import { graphql } from "gatsby";
import { makeStyles } from "@material-ui/styles";
import Img from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  article: {
    lineHeight: 1.6,
    fontFamily: "Mulish",
    fontSize: "1.1rem",
    "& blockquote": {
      borderLeft: "3px solid #303032",
      marginLeft: -16,
      paddingLeft: 13,
      fontStyle: "italic"
    }
  }
}));

export default function PageTemplate({ data }) {
  const classes = useStyles();
  const { mdx } = data;
  const {
    frontmatter: { featuredImage, title },
    body
  } = mdx;
  return (
    <Layout>
      <Box flexGrow={1} width="100%" maxWidth={960} marginX="auto">
        <Box padding={2}>
          <Box marginBottom={1}>
            <Typography
              variant="h4"
              style={{
                fontWeight: "bold",
                fontFamily: "Mulish"
              }}
            >
              {title}
            </Typography>
          </Box>
          <article className={classes.article}>
            <MDXRenderer>{body}</MDXRenderer>
          </article>
        </Box>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($postId: String!) {
    mdx(frontmatter: { id: { eq: $postId } }) {
      body
      frontmatter {
        id
        title
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1280) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
