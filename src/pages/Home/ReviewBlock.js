import React from "react";

// Custom components
import Typography from "../../components/Typography";
import ReviewCard from "../../components/ReviewCard";
import { primaryColor, secondaryColor } from "../../styles/Style";

// Material-UI components
import { Container, Grid } from "@material-ui/core";

// Images
const nikojulius =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FReview_Profile_Picture%2Fnikojulius.jpg?alt=media&token=9d4a5806-73de-4cde-b599-1deb4238d276";
const samuelchrist =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FReview_Profile_Picture%2Fsamuelchrist.jpg?alt=media&token=ce5ddd2f-13e5-4d1d-a4d3-fd6b0d200685";
const rinaldi =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FReview_Profile_Picture%2Frinaldi.jpg?alt=media&token=ec60d904-c48e-41c4-b6b7-803eed4acea2";
const ogut =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FReview_Profile_Picture%2Fogut.jpg?alt=media&token=127e7980-61d0-4df7-a538-7e23b7c75ec5";

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
    photoURL: nikojulius,
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
    photoURL: samuelchrist,
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
    photoURL: rinaldi,
  },
  ,
  {
    id: 4,
    name: (
      <>
        Ogut Mudacumasekali | Founder mudacumasekali &{" "}
        <a
          style={{
            textDecoration: "none",
            // fontStyle: "italic",
            color: secondaryColor,
          }}
          href="https://contentacademy.id/"
        >
          contentacademy.id
        </a>
      </>
    ),
    comment: `
    "Aplikasi ini asik banget buat yang lagi nyetir mobil dan olahraga sembari
    belajar. Walaupun sibuk beraktifitas fisik, tetep bisa banget masukin ilmu
    ke otak. Recommended banget buat yang mau jadi pinter."
    `,
    userInstagram: "mudacumasekali",
    userInstagramLink: "https://www.instagram.com/mudacumasekali",
    photoURL: ogut,
  },
];

console.log(data[0].name);

export default function ReviewBlock({}) {
  return (
    <Container>
      <Typography
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          marginTop: "50px",
          marginBottom: "0",
          letterSpacing: "3px",
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        Yuk, Bergabung dengan{" "}
        <strong
          style={{
            backgroundColor: primaryColor,
          }}
        >
          <strong style={{ fontFamily: "Montserrat" }}>1000+</strong> orang
          lainnya!
        </strong>
      </Typography>
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
