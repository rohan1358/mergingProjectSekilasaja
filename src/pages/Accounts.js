import React from "react";

// Custom components
import Parallax from "../components/Parallax";
import Typography from "../components/Typography";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

// Material-UI components
import { Container } from "@material-ui/core";

export default function AccountsPage() {
  return (
    <div>
      <NavBar />
      <Container>Accounts Page</Container>
      <Footer />
    </div>
  );
}
