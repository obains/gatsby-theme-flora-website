import React from "react";
import { Link, graphql } from "gatsby";
import { makeStyles } from "@material-ui/styles";
import Img from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
import moment from "moment";
import { Box, Button, Chip, Typography } from "@material-ui/core";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import theme from "../style/theme";

const useStyles = makeStyles(() => ({
  article: {
    lineHeight: 1.6,
    fontFamily: "Heebo",
    fontSize: "1.1rem",
    "& blockquote": {
      borderLeft: "3px solid #303032",
      marginLeft: -16,
      paddingLeft: 13,
      fontStyle: "italic"
    }
  },
  chip: {
    marginRight: 4
  }
}));

const Tags = ({ tags }) => {
  const classes = useStyles();

  return (
    <Box marginY={1}>
      {tags.map(tag => {
        return (
          <Chip
            color="default"
            variant="outlined"
            classes={{ root: classes.chip }}
            label={tag}
            key={tag}
            component={Link}
            to={`/tag/${tag}`}
            onClick={() => {}}
          />
        );
      })}
    </Box>
  );
};

export default function PostTemplate({ data, pageContext }) {
  const classes = useStyles();
  const { mdx } = data;
  const {
    frontmatter: { coverImage, title, subtitleCaption, tags },
    body
  } = mdx;
  const { previousPath, nextPath, postDate } = pageContext;


  return (
    <Layout>
      <Box flexGrow={1} width="100%" maxWidth={960} marginX="auto">
        <Box padding={2}>
          <Box marginBottom={1}>
            <Typography
              variant="h4"
              style={{
                fontWeight: "bold",
                fontFamily: "Oswald"
              }}
            >
              {title}
            </Typography>
            <Typography variant="body2">
              {subtitleCaption}
            </Typography>          
            <Tags tags={tags} />
          </Box>    
          <Img
            fluid={coverImage.childImageSharp.fluid} // add in the postDate if required
            style={{ borderRadius: 2 }}
            style={{ height: 300}} // define height of image 
          />
          <article className={classes.article}>
            <MDXRenderer>{body}</MDXRenderer>
          </article>
          <Box display="flex">
            <Box flexGrow={1}>
              {previousPath && (
                <Button
                  component={Link}
                  to={previousPath}
                  borderRadius={ theme.shape.borderRadius = "0%" }
                  variant="outlined"
                  color="secondary"
                >
                  <FaChevronLeft size={8} />
                  <Box marginLeft={0.5}>Previous</Box>
                  
                </Button>
              )}
            </Box>
            {nextPath && (
              <Button
                component={Link}
                to={nextPath}
                variant="outlined"
                color="secondary"
                borderRadius={ theme.shape.borderRadius = "0%" }
              >
                <Box marginRight={0.5}>Next</Box>
                <FaChevronRight size={8} />
              </Button>
            )}
          </Box>
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
        subtitleCaption
        tags
        coverImage {
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
