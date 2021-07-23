import React from "react";

// Custom components
import Typography from "../../components/Typography";
import HomeParallax from "./Components/HomeParallax";
import BenefitsBlock from "../../components/BenefitsBlock";

// Material-UI components
import Container from "@material-ui/core/Container";

export default function Home() {
  return (
    <div>
      <Container>
        <BenefitsBlock />
      </Container>
    </div>
  );
}
