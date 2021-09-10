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
import InfoArea from "../../components/InfoArea";
import MultiUseMobile from "../../styles/MultiUseMobile";
import Typography from "../../components/Typography";

// nodejs library to set properties for components
import classNames from "classnames";
import { beigeColor, primaryColor, secondaryColor } from "../../styles/Style";

export default function BenefitsBlock({ logo, button }) {
  const classes = MultiUseMobile();
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });

  return (
    <div style={{ color: beigeColor, backgroundColor: secondaryColor }}>
      <Container>
        <div className={desktopClass}>
          <Grid container direction="row" spacing={3}>
            <Grid className={classes.title} item xs={12}>
              <Typography
                color="beigeColor"
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  marginTop: "50px",
                  marginBottom: "0",
                  letterSpacing: "3px",
                  fontWeight: 700,
                }}
              >
                Perluas pengetahuan Kamu lebih cepat dari sebelumnya
              </Typography>
              <Typography
                color="beigeColor"
                style={{
                  marginTop: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                size="heading"
              >
                {/* <div style={{ display: "flex", alignItems: "center" }}> */}
                Kenapa harus bergabung di {logo} ?{/* </div> */}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <InfoArea
                title="Text & Audio"
                description={
                  <div>
                    Baca atau dengarkan intisari dari buku-buku terlaris dunia
                    dalam{" "}
                    <strong
                      style={{
                        color: primaryColor,
                      }}
                    >
                      15 menit!
                    </strong>
                  </div>
                }
                icon={MenuBook}
                iconColor="info"
                vertical
              />
            </Grid>
            <Grid item xs={3}>
              <InfoArea
                title="Video Animasi"
                description={
                  <div>
                    Memudahkan Kamu mengerti isi buku dengan{" "}
                    <strong
                      style={{
                        color: primaryColor,
                      }}
                    >
                      video khusus
                    </strong>
                    . Cocok buat Kamu yang visual learner.
                  </div>
                }
                icon={VideoLibrary}
                iconColor="info"
                vertical
              />
            </Grid>
            <Grid item xs={3}>
              <InfoArea
                title="Komunitas Eksklusif"
                description={
                  <div>
                    Kesuksesan dipengaruhi oleh dengan siapa Kamu bergaul!
                    Bergabung dengan komunitas terbaik untuk{" "}
                    <strong
                      style={{
                        color: primaryColor,
                      }}
                    >
                      mengembangkan diri di grup Telegram.
                    </strong>
                  </div>
                }
                icon={Group}
                iconColor="info"
                vertical
              />
            </Grid>
            <Grid item xs={3}>
              <InfoArea
                title="Temukan Buku Baru"
                description={
                  <div>
                    Dapatkan tambahan{" "}
                    <strong
                      style={{
                        color: primaryColor,
                      }}
                    >
                      15+ Kilas buku
                    </strong>{" "}
                    best-seller dunia setiap bulannya!
                  </div>
                }
                icon={WbIncandescent}
                iconColor="info"
                vertical
              />
              <div style={{ marginBottom: "30px" }} />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {button}
              </div>
              <div style={{ marginBottom: "30px" }} />
            </Grid>
          </Grid>
        </div>

        <div className={mobileClass}>
          <Grid container direction="row" spacing={0}>
            <Grid className={classes.title} item xs={12}>
              <Typography
                color="beigeColor"
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  marginTop: "50px",
                  marginBottom: "0",
                  letterSpacing: "3px",
                  fontWeight: 700,
                }}
              >
                Perluas pengetahuan Kamu lebih cepat dari sebelumnya
              </Typography>
              <Typography
                color="beigeColor"
                style={{
                  marginTop: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0px",
                }}
                size="heading"
              >
                Kenapa harus bergabung di
              </Typography>
              <Typography
                style={{
                  marginTop: "0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                color="beigeColor"
                size="heading"
              >
                {logo} ?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InfoArea
                title="Text & Audio"
                description={
                  <div>
                    Baca atau dengarkan intisari dari buku-buku terlaris dunia
                    dalam{" "}
                    <strong
                      style={{
                        color: primaryColor,
                      }}
                    >
                      15 menit!
                    </strong>
                  </div>
                }
                icon={MenuBook}
                iconColor="info"
                vertical
              />
            </Grid>
            <Grid item xs={12}>
              <InfoArea
                title="Video Animasi"
                description={
                  <div>
                    Memudahkan Kamu mengerti isi buku dengan{" "}
                    <strong
                      style={{
                        color: primaryColor,
                      }}
                    >
                      video khusus
                    </strong>
                    . Cocok buat Kamu yang visual learner.
                  </div>
                }
                icon={VideoLibrary}
                iconColor="info"
                vertical
              />
            </Grid>
            <Grid item xs={12}>
              <InfoArea
                title="Komunitas Eksklusif"
                description={
                  <div>
                    Kesuksesan dipengaruhi oleh dengan siapa Kamu bergaul!
                    Bergabung dengan komunitas terbaik untuk{" "}
                    <strong
                      style={{
                        color: primaryColor,
                      }}
                    >
                      mengembangkan diri di grup Telegram.
                    </strong>
                  </div>
                }
                icon={Group}
                iconColor="info"
                vertical
              />
            </Grid>
            <Grid item xs={12}>
              <InfoArea
                title="Temukan Buku Baru"
                description={
                  <div>
                    Dapatkan tambahan{" "}
                    <strong
                      style={{
                        color: primaryColor,
                      }}
                    >
                      15+ Kilas buku
                    </strong>{" "}
                    best-seller dunia setiap bulannya!
                  </div>
                }
                icon={WbIncandescent}
                iconColor="info"
                vertical
              />

              <Grid item xs={12}>
                <div style={{ marginBottom: "70px" }} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {button}
                </div>
                <div style={{ marginBottom: "30px" }} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
