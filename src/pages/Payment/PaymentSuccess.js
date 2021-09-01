import React from "react";

// Custom components
import Typography from "../../components/Typography";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Button from "../../components/Button";

// Material-UI components
import { Container, Grid } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

export default function PaymentSuccess() {
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
            <div className={multi.center}>
              <Typography type="italic" size="heading">
                Pembayaran Berhasil!
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className={multi.center}>
              <Button href="/">
                <HomeIcon />
                Kembali ke halaman beranda
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
