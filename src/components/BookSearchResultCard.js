import React, { useState, useContext, useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Material-UI components
import { Container } from "@material-ui/core";

import fire from "../firebase/fire";
import * as firebaseGetBookDashboardImageURL from "../firebase/firebaseGetBookDashboardImageURL";

const useStyles = makeStyles({
  root: {
    display:'flex'
  },
  title: {
    fontSize: 20,
  },
  media: {
    width: 250,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    flex: '1 0 auto',
  },
  imgRounded: {
    borderRadius: "1px !important",
  },
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
  imgBookCover: {
    marginTop: "5px",
    width: "100%",
    maxWidth: "250px",
  },
});

export default function BookSearchResultCard({product, title, history}) {
    const classes = useStyles();
    const [coverLink, setCoverLink] = useState("");

    console.log(product);
    useEffect(() => {
        if (title != null) {
        const getLink = firebaseGetBookDashboardImageURL.getBookDashboardImageURL(title);

        const fetchData = async () => {
            const link = await getLink;
            setCoverLink(link);
        };
        fetchData();
        }
    }, []);

    return (
            <Card className={classes.root}>
                <CardActionArea className={classes.details} href={`/book-details/${product.book_title}`}>
                    <CardMedia
                    className={classes.media}>
                        <img
                        src={coverLink}
                        alt={product.book_title}
                        className={
                            classes.imgRounded +
                            " " +
                            classes.imgFluid +
                            " " +
                            classes.imgBookCover
                        }
                        />
                    </CardMedia>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2" type="bold">
                            {title}
                        </Typography>
                        <Typography  variant="body2" color="textSecondary" component="p" type="italic">{product.author}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.description}
                        </Typography>
                        </CardContent>
                    </div>
                </CardActionArea>
            </Card>
    );
}