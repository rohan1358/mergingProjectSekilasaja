import React from "react";
import BookCover from "../images/rdpd.jpg";

// Custom components
import BookDetails from "../components/BookDetails";

// Material-UI components
import { Container } from "@material-ui/core";

export default function BookDetailsPage() {
  return (
    <div>
      <Container>
        <BookDetails
          cover={BookCover}
          title={"Rich Dad Poor Dad"}
          author={"Robert Kiyosaki"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada consectetur nibh ut ornare. Ut non tempor justo, lobortis porttitor lorem. Aenean sed metus dolor. Praesent in metus a lacus suscipit interdum id sit amet metus. Aliquam erat volutpat. Vestibulum id auctor leo."
          }
          button1={"Masukkan ke keranjang"}
          button2={"Masukkan ke keranjang"}
          button3={"Masukkan ke keranjang"}
        />
      </Container>
    </div>
  );
}
