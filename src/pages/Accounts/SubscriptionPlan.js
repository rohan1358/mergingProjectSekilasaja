import React from "react";

// Custom components
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import MultiUseMobile from "../../styles/MultiUseMobile";

// Material UI components
import { Grid } from "@material-ui/core";

// nodejs library to set properties for components
import PropTypes from "prop-types";

export default function SubscriptionPlan(props) {
  const classes = MultiUseMobile();
  const { subscriptionType, number } = props;
  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <Typography type="bold">Tipe Langganan</Typography>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Typography type="italic">{subscriptionType}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography type="bold">Jumlah Kilasan</Typography>
        </Grid>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Typography type="italic">{number}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth color="primary" href="/pricing">
            Berlanggan Sekarang!
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

SubscriptionPlan.propTypes = {
  subscriptionType: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
