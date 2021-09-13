import React from "react";

// Custom components
import Typography from "../../components/Typography";
import ReviewCard from "../../components/ReviewCard";
import { secondaryColor } from "../../styles/Style";
import { Instagram } from "@material-ui/icons";

// Material-UI components
import { Container, Grid } from "@material-ui/core";

const data = [
  {
    id: 1,
    name: (
      <>
        Niko Julius | Founder{" "}
        <a
          style={{
            textDecoration: "none",
            fontStyle: "italic",
            color: secondaryColor,
          }}
          href="https://nikojulius.com/"
        >
          nikojulius.com
        </a>
      </>
    ),
    comment: `
    "Aplikasi yang bagus banget, super insightful, membantu untuk terus belajar dan bertumbuh.
    Plus, sangat membantu dalam berbagai bentuk self development. Baca buku & dapatin point2
    pentingnya jadi super cepat! Excellent!"
    `,
    userInstagram: "bynikojulius",
    userInstagramLink: "https://www.instagram.com/bynikojulius",
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Review_Profile%2Fnikojulius.jpg?alt=media&token=f3a855d7-6b93-426e-89f0-7d4fb9a7cc5a",
  },
  {
    id: 2,
    name: <>Samuel Christ | Miliarder Muda</>,
    comment: `
    "Aplikasi yang bagus banget, super insightful, membantu untuk terus belajar dan bertumbuh.
    Plus, sangat membantu dalam berbagai bentuk self development. Baca buku & dapatin point2
    pentingnya jadi super cepat! Excellent!"
    `,
    userInstagram: "samuelchrist",
    userInstagramLink: "https://www.instagram.com/samuelchrist",
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Review_Profile%2Fsamuelchrist.jpg?alt=media&token=82857e9d-6cc4-4dfe-a162-dbb10f140579",
  },
  {
    id: 3,
    name: (
      <>
        Niko Julius | Founder{" "}
        <a
          style={{
            textDecoration: "none",
            fontStyle: "italic",
            color: secondaryColor,
          }}
          href="https://nikojulius.com/"
        >
          nikojulius.com
        </a>
      </>
    ),
    comment: `
    "Aplikasi yang bagus banget, super insightful, membantu untuk terus belajar dan bertumbuh.
    Plus, sangat membantu dalam berbagai bentuk self development. Baca buku & dapatin point2
    pentingnya jadi super cepat! Excellent!"
    `,
    userInstagram: "samuelchrist",
    userInstagramLink: "https://www.instagram.com/samuelchrist",
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Review_Profile%2Fnikojulius.jpg?alt=media&token=f3a855d7-6b93-426e-89f0-7d4fb9a7cc5a",
  },
  {
    id: 4,
    name: (
      <>
        Niko Julius | Founder{" "}
        <a
          style={{
            textDecoration: "none",
            fontStyle: "italic",
            color: secondaryColor,
          }}
          href="https://nikojulius.com/"
        >
          nikojulius.com
        </a>
      </>
    ),
    comment: `
    "Aplikasi yang bagus banget, super insightful, membantu untuk terus belajar dan bertumbuh.
    Plus, sangat membantu dalam berbagai bentuk self development. Baca buku & dapatin point2
    pentingnya jadi super cepat! Excellent!"
    `,
    userInstagram: "samuelchrist",
    userInstagramLink: "https://www.instagram.com/samuelchrist",
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Review_Profile%2Fnikojulius.jpg?alt=media&token=f3a855d7-6b93-426e-89f0-7d4fb9a7cc5a",
  },
  ,
];

console.log(data[0].name);

export default function ReviewBlock({}) {
  return (
    <Container>
      <Typography style={{ textAlign: "center" }} size="heading">
        Apa Kata Mereka...
      </Typography>

      <Grid container spacing={3}>
        {data.map((x) => (
          <ReviewCard
            photoURL={x.photoURL}
            name={x.name}
            comment={x.comment}
            userInstagram={x.userInstagram}
            userInstagramLink={x.userInstagramLink}
          />
        ))}
      </Grid>
    </Container>
  );
}
