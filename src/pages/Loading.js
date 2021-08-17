import React from "react";
import Logo from "../images/dark-logo.png";

// Custom components
import Typography from "../components/Typography";
import MultiUseMobile from "../styles/MultiUseMobile";

// Material-UI components
import { Container, Grid } from "@material-ui/core";

export default function Loading() {
  const multi = MultiUseMobile();
  return (
    <div>
      <Container>
        <Grid
          container
          direction="row-reverse"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <div className={multi.extraSpace} />
          </Grid>
          <Grid item xs={12}>
            <div className={multi.extraSpace} />
          </Grid>
          <Grid item xs={12}>
            <div className={multi.extraSpace} />
          </Grid>

          <Grid item xs={12}>
            <Typography className={multi.center} type="italic" size="heading">
              Loading...
            </Typography>
            <Typography className={multi.center} size="subheading">
              Mohon Tunggu Sebentar!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
