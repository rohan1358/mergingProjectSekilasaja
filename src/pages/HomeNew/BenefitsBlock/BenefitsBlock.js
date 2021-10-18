import React from "react";

// @material-ui/core components
import { Grid, Container } from "@material-ui/core";
import {
  VideoLibrary,
  MenuBook,
  Group,
  WbIncandescent,
} from "@material-ui/icons";

// Custom components
import MultiUseMobile from "../../../styles/MultiUseMobile";
import Typography from "../../../components/Typography";
import InfoArea from "./InfoArea";

export default function BenefitsBlock({ logo, button }) {
  const classes = MultiUseMobile();

  return (
    <div>
      <Container>
        <Grid container direction="row" justifyContent="center" spacing={3}>
          <Grid className={classes.title} item xs={12}>
            <Typography size="heading">
              Kenapa Harus{" "}
              <strong className={classes.underline}>Bergabung</strong> Di {logo}{" "}
              ?
            </Typography>
          </Grid>
          <Grid item md={3} xs={8}>
            <InfoArea
              title="Text & Audio"
              description={
                <div>
                  Baca atau dengarkan intisari dari buku-buku terlaris dunia
                  dalam <strong>15 menit!</strong>
                </div>
              }
              icon={MenuBook}
              iconColor="info"
              vertical
            />
          </Grid>
          <Grid item md={3} xs={8}>
            <InfoArea
              title="Video Animasi"
              description={
                <div>
                  Memudahkan Kamu mengerti isi buku dengan{" "}
                  <strong>video khusus</strong>. Cocok buat Kamu yang visual
                  learner.
                </div>
              }
              icon={VideoLibrary}
              vertical
            />
          </Grid>

          <Grid item md={3} xs={8}>
            <InfoArea
              title="Komunitas Eksklusif"
              description={
                <div>
                  Kesuksesan dipengaruhi oleh dengan siapa Kamu bergaul!
                  Bergabung dengan komunitas terbaik untuk{" "}
                  <strong>mengembangkan diri di grup Telegram.</strong>
                </div>
              }
              icon={Group}
              vertical
            />
          </Grid>

          <Grid item md={3} xs={8}>
            <InfoArea
              title="Temukan Buku Baru"
              description={
                <div>
                  Dapatkan tambahan <strong>30++ Kilas buku</strong> best-seller
                  dunia setiap bulannya!
                </div>
              }
              icon={WbIncandescent}
              vertical
            />
            <div style={{ marginBottom: "30px" }} />
          </Grid>

          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {button}
            </div>
            <div style={{ marginBottom: "50px" }} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
