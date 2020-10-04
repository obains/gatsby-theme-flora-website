import React from "react";
import path from "path";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import theme from "../style/theme";
import { useHasScroll } from "has-scroll-hook";

const Posts = ({ posts, pathPrefix }) => {
  return (
    <Grid container spacing={3}>
      {posts.map(
        ({
          node: {
            excerpt,
            fileAbsolutePath,
            frontmatter: { id, title, featuredImage }
          }
        }) => {
          const postDate = path
            .basename(fileAbsolutePath)
            .split(".")
            .splice(0,1)
            .join(" ");
          return (
            <Grid item xs={12} sm={4} key={id}>
              <Card
                featuredImage={featuredImage}
                title={title}
                url={`/${pathPrefix}/${id}`}
                postDate={postDate}
                excerpt={excerpt}
              />
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default function HomeTemplate({
  data: {
    site: {
      siteMetadata: {
        subtitle,
        description,
        templates: {
          posts: { pathPrefix }
        }
      }
    },
    allMdx: { edges: posts }
  }
}) {
  /* Get the vertical scrollbar offset as a boolean value. */
  const hasScroll = useHasScroll();

  return (
    <Layout elevateAppBar={hasScroll}>
      <Box display="flex" flexDirection="column">
        <Box
          textAlign="center"
          paddingTop={1}
          paddingBottom={1}
          paddingX={8}
          style={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            clipPath: "rectangle(0 0, 100% 60, 100% 0%, 0% 100%)",
            "-webkit-clip-path": "polygon(0 0, 100% 60, 100% 0%, 0% 100%)"
          }}
        >
          <Box flexGrow={1} marginX={"auto"} width="90%" marginBottom={4} marginTop={2}> 
            <Typography
              color="inherit" // the above paramaters fiddle with the title size. delete everything apart from marginBottom={4}
              variant="h2"
              style={{
                position: "center",
                fontSize: "3rem",
                fontWeight: "500",
                letterSpacing: 2.5,
                fontFamily:
                  'Mulish', // was Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif
                marginBottom: 4
              }}
            >
              {subtitle}
            </Typography>
            <Typography color="inherit" variant="body1">
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box flexGrow={1} marginX="auto" width="100%" maxWidth={960}>
        <Box padding={4}>
          <Posts posts={posts} pathPrefix={pathPrefix} />
          {posts.length > 1 && (
            <Box
              display="flex"
              justifyContent="flex-end"
              padding={3}
              marginTop={1}
            >
              <Button
                variant="contained"
                outlined={
                  theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0.23)'}
                borderRadius={
                  theme.shape.borderRadius = "0%" }
                color="secondary"
                component={Link}
                to={`/${pathPrefix}/page/1`}
              >
                View All
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($limit: Int!) {
    site {
      siteMetadata {
        subtitle
        description
        templates {
          posts {
            pathPrefix
          }
        }
      }
    }
    allMdx(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { order: ASC, fields: [fileAbsolutePath] }
      limit: $limit
    ) {
      edges {
        node {
          excerpt(pruneLength: 80)
          fileAbsolutePath
          frontmatter {
            id
            title
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
