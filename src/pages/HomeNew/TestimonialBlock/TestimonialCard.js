import React from "react";

// @material-ui/core components
import { makeStyles, Grid, Paper, Avatar } from "@material-ui/core";
import { Instagram } from "@material-ui/icons";

// Custom components
import InfoAreaStyle from "../../../styles/InfoAreaStyle";
import Typography from "../../../components/Typography";
import { beigeColor, secondaryColor } from "../../../styles/Style";

// Images
const Verified =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fverified.png?alt=media&token=598f728a-c9bf-4732-b88e-0b8176ee7ea6";

// Styles
const useStyles = makeStyles(InfoAreaStyle);

export default function TestimonialCard({
  name,
  comment,
  userInstagram,
  photoURL,
  userInstagramLink,
}) {
  // Styles
  const classes = useStyles();

  return (
    <div style={{ padding: 30 }}>
      <Paper
        style={{
          padding: "20px",
          borderColor: secondaryColor,
          backgroundColor: beigeColor,
          borderRadius: 30,
        }}
        variant="outlined"
      >
        <Grid container>
          <Grid item xs={12}>
            <div style={{ marginTop: "20px" }} />
            <Typography>{comment}</Typography>
          </Grid>

          <Grid style={{ display: "flex", alignItems: "center" }} item xs={12}>
            <Avatar style={{ width: 50, height: 50 }} src={photoURL} />
            <div style={{ paddingLeft: "10px" }}>
              <Typography style={{ marginBottom: 0 }} type="bold">
                {name}{" "}
                <img style={{ marginBottom: -3, width: 20 }} src={Verified} />
              </Typography>
              <a
                style={{
                  textDecoration: "none",
                  color: secondaryColor,
                }}
                href={userInstagramLink}
              >
                <Typography
                  type="italic"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 14,
                    marginTop: 3,
                  }}
                >
                  @{userInstagram}
                </Typography>
              </a>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <div style={{ marginTop: 20 }} />
    </div>
  );
}
