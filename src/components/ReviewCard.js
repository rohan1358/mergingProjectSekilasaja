import React from "react";

// @material-ui/core components
import { makeStyles, Grid, Paper, Avatar } from "@material-ui/core";

// Custom components
import InfoAreaStyle from "../styles/InfoAreaStyle";
import Typography from "./Typography";
import { beigeColor, secondaryColor } from "../styles/Style";

const useStyles = makeStyles(InfoAreaStyle);

export default function ReviewCard({ name, comment, userInfo, photoURL }) {
  // Styles
  const classes = useStyles();

  return (
    <Grid className={classes.reviewHover} item md={6} xs={12}>
      <Paper
        style={{
          padding: "20px",
          borderColor: secondaryColor,
          backgroundColor: beigeColor,
        }}
        variant="outlined"
      >
        <Grid container>
          <Grid style={{ display: "flex", alignItems: "center" }} item xs={12}>
            <Avatar style={{ width: 70, height: 70 }} src={photoURL} />
            <div style={{ paddingLeft: "10px" }}>
              <Typography style={{ marginBottom: 3 }} type="bold">
                {name}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ marginTop: "20px" }} />
            <Typography>{comment}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
