import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles(() => ({
  cardActions: {
    justifyContent: "flex-end"
  },
  card: {
    background: "transparent"
  },
  cardContent: {
    padding: 12
  }
}));

export default ({ featuredImage, title, postDate, excerpt, url }) => {
  const classes = useStyles();

  return (
    <Card elevation={5} classes={{ root: classes.card }}>
      <Img
        fluid={featuredImage.childImageSharp.fluid}        
        style={{ borderRadius: 0 }}
        style={{ height: 280 }}
      />
      <CardContent classes={{ root: classes.cardContent }}
        style={{ height: 150 }}
      >
        <Typography
          gutterBottom
          variant="h6"
          style={{
            marginBottom: 0,
            fontWeight: 1000,
            fontFamily: "Heebo",
            lineHeight: 1.3
          }}
        >
          {title}
        </Typography>
        <Typography variant="caption" color="textSecondary" style={{
            marginBottom: 0,
            fontWeight: 400,
            fontSize: "0.8rem",
            fontFamily: "Heebo"
          }}>
          {postDate}
        </Typography>
        <Box marginY={1}>
          <Divider light />
        </Box>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          component="p"
          style={{ 
            fontFamily: "Heebo",
            fontSize: "0.9rem" 
          }}
        >
          {excerpt}
        </Typography>
      </CardContent>
      <CardActions classes={{ root: classes.cardActions }}>
        <Button component={Link} to={url} color="secondary" >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};
