import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Link from "../components/Link";

const useStyles = makeStyles(theme => ({
  footer: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,   
    "& a:hover": {
      textDecoration: "underline"
    },
    "& ul": {
      padding: 0,
      listStyle: "none"
    },
    "& li": {
      marginBottom: theme.spacing(0.5)
    }
  }
}));

const FooterColumns = ({ columns }) => {
  return null
};

export default () => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              components {
                footer {
                  columns {
                    heading
                    links {
                      title
                      url
                    }
                  }
                  copyright
                }
              }
            }
          }
        }
      `}
      render={({
        site: {
          siteMetadata: {
            components: {
              footer: { columns, copyright }
            }
          }
        }
      }) => {
        return (
          <Box component="footer" className={classes.footer}>
            <Container maxWidth="md">
              <Box padding={4}>
                <FooterColumns columns={columns} />
                <Box textAlign="center" marginTop={2}>
                  <Typography variant="caption">
                    &copy; {new Date().getFullYear()} {copyright}
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>
        );
      }}
    />
  );
};
