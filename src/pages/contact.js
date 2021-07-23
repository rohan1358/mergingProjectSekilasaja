import React from "react";

// Custom components
import Parallax from "../components/Parallax";
import Typography from "../components/Typography";

export default function Contact() {
  return (
    <div>
      <Parallax filter image={require("../images/contact.jpg").default}>
        <Typography color="beigeColor" size="heading">
          Kamu Bisa Hubungi Kami Lewat
        </Typography>
        <Typography color="beigeColor" size="subheading" type="italic">
          hi@sekilasaja.com
        </Typography>
      </Parallax>
    </div>
  );
}
