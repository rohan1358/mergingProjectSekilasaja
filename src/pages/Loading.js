import React from "react";

// Custom components
import Typography from "../components/Typography";
import MultiUseMobile from "../styles/MultiUseMobile";

// Material-UI components
import { Container, Grid, CircularProgress } from "@material-ui/core";
import { beigeColor, secondaryColor } from "../styles/Style";

export default function Loading() {
  // Styles
  const multi = MultiUseMobile();
  return (
    <div style={{ backgroundColor: beigeColor }}>
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

          <Grid style={{ textAlign: "center" }} item xs={12}>
            <CircularProgress style={{ color: secondaryColor }} />
            <Typography type="italic" size="heading">
              Loading...
            </Typography>
            <Typography size="subheading">Mohon Tunggu Sebentar!</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
