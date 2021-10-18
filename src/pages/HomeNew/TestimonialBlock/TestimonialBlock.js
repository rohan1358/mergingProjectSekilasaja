import React from "react";

// Other components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Custom components
import TestimonialCard from "./TestimonialCard";
import Typography from "../../../components/Typography";
import { primaryColor, secondaryColor } from "../../../styles/Style";
import InfoStyle from "../../../styles/InfoAreaStyle";

// Material-UI components
import { Container, makeStyles } from "@material-ui/core";

// Images
const homeBG =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fcoming-soon.png?alt=media&token=c6a47889-cc24-4cab-9d84-ff6106ec7c19";
const Logo =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fyellow-logo.png?alt=media&token=7483e708-574b-455d-9128-b03fe6b0e4e2";

// Styles
const useStyles = makeStyles(InfoStyle);
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

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

export default function TestimonialBlock() {
  // Styles
  const books = useStyles();

  return (
    <div
      style={{
        backgroundImage: `url(${homeBG})`,
        backgroundSize: "cover",
        padding: 10,
      }}
    >
      <Container>
        <Typography
          size="heading"
          style={{ color: primaryColor, textAlign: "center" }}
        >
          Kata Mereka Tentang{" "}
          <img
            src={Logo}
            style={{ marginBottom: -23 }}
            className={books.imgLogoText}
          />
        </Typography>
        <Carousel
          arrows={false}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1500}
          ssr={true}
          responsive={responsive}
        >
          {data.map((x) => (
            <TestimonialCard
              photoURL={x.photoURL}
              name={x.name}
              comment={x.comment}
              userInstagram={x.userInstagram}
              userInstagramLink={x.userInstagramLink}
            />
          ))}
        </Carousel>
      </Container>
    </div>
  );
}
