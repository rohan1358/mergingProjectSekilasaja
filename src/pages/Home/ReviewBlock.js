import React from "react";
import Verified from "../../images/verified.png";

// Custom components
import Typography from "../../components/Typography";
import ReviewCard from "../../components/ReviewCard";
import { secondaryColor } from "../../styles/Style";

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
            // fontStyle: "italic",
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
    name: <>Samuel Christ | Founder SekilasAja!</>,
    comment: `
    "Harapanku SekilasAja! bisa menjadi solusi untuk Indonesia yang malas baca.
    Tidak ada lagi alasan untuk orang malas membaca. Dalam 15 menit aja,
    kamu sdh bisa menyelesaikan satu buku! Belajar kapanpun dan dimanapun!"
    `,
    userInstagram: "samuelchrist",
    userInstagramLink: "https://www.instagram.com/samuelchrist",
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Review_Profile%2Fsamuelchrist.jpg?alt=media&token=82857e9d-6cc4-4dfe-a162-dbb10f140579",
  },
  {
    id: 3,
    name: <>Rinaldi Nur Ibrahim | Founder Youth Ranger Indonesia</>,
    comment: `
    "Banyak banget buku yang mau aku baca tersedia disini. Dipermudah lagi
    dengan kita bisa mempelajari bukunya melalui Audio dan Visual. Ini inovatif
    sekali untuk orang yang malas baca buku berlembar-lembar tapi ingin mendapatkan
    ilmu dari bukunya. Goodjob SekilasAja!"
    `,
    userInstagram: "rinaldi_ni",
    userInstagramLink: "https://www.instagram.com/rinaldi_ni",
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Review_Profile%2Frinaldi.jpg?alt=media&token=3ce705c6-5752-4330-b871-9f96154b06a9",
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

      <Grid container justifyContent="center" spacing={3}>
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
