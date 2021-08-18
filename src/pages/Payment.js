import React from "react";

// Custom components
import Typography from "../components/Typography";
import MultiUseMobile from "../styles/MultiUseMobile";
import Button from "../components/Button";

// Testing purposes

// Material-UI components
import { Container, Paper, Grid, TextField } from "@material-ui/core";

export default function Payment() {
  const classes = MultiUseMobile();

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography className={classes.center} size="heading">
            Checkout Page
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paddedContent} elevation={5}>
            <Typography size="subheading">1. Your Orders</Typography>
            <div className={classes.spaceBetween}>
              <Typography type="italic">6-month subscription</Typography>
              <Typography type="italic">Rp. 69,000</Typography>
            </div>

            <div className={classes.extraSpace} />
            <div className={classes.spaceBetween}>
              <Typography size="subheading">TOTAL</Typography>
              <Typography size="subheading">Rp. 69,000</Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paddedContent} elevation={5}>
            <Typography size="subheading">2. Checkout Form</Typography>
            <TextField
              className={classes.textFieldRoot}
              id="filled-basic"
              label="First Name"
              variant="filled"
              fullWidth
            />
            <TextField
              className={classes.textFieldRoot}
              id="filled-basic"
              label="Last Name"
              variant="filled"
              fullWidth
            />
            <TextField
              className={classes.textFieldRoot}
              id="filled-basic"
              label="Email"
              variant="filled"
              fullWidth
            />
            <TextField
              className={classes.textFieldRoot}
              id="filled-basic"
              label="Phone Number"
              variant="filled"
              fullWidth
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paddedContent} elevation={5}>
            <Typography size="subheading">3. Payment</Typography>
            <Typography type="bold">Step 1:</Typography>
            <Typography>
              • Transfer ke rekening BCA 123456789 a/n Darren Lucky
            </Typography>
            <Typography>
              • Atau, transfer ke rekening Mandiri 123456789 a/n Darren Lucky
            </Typography>
            <Typography>
              • Atau, transfer ke rekening BRI 123456789 a/n Darren Lucky
            </Typography>
            <Typography className={classes.paragraphSpace} type="bold">
              Step 2:
            </Typography>
            <Typography>
              Pastikan nominal yang anda transfer sesuai dengan harga yang
              tertulis, bila anda transfer dengan nominal yang salah harap
              hubungi customer service kami.
            </Typography>
            <Typography className={classes.paragraphSpace} type="bold">
              Step 3:
            </Typography>
            <Typography>
              Foto atau screenshot bukti transfer anda, lalu upload foto melalui
              tombol "Attach File" di bawah!
            </Typography>
            <Button className={classes.paragraphSpace} color="secondary">
              Attach File
            </Button>
          </Paper>

          <div className={classes.extraSpace} />

          <Grid item xs={12}>
            <Button fullWidth round>
              Bayar Sekarang
            </Button>
          </Grid>

          <div className={classes.extraSpace} />
        </Grid>
      </Grid>
    </Container>
  );
}
