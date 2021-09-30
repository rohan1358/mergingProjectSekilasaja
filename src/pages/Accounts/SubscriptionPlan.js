import React, { useState, useEffect, useContext } from "react";

// Custom components
import Typography from "../../components/Typography";
import Button from "../../components/Button";

// Material UI components
import { Grid } from "@material-ui/core";

//firebase components
import { AuthContext } from "../../components/Routing/Auth";
import * as firebaseGetUserDataById from "../../firebase/firebaseGetUserDataById";

export default function SubscriptionPlan({
  subscriptionType,
  number,
  endDate,
}) {
  // useState hooks
  const [userData, setUserData] = useState([]);

  // Auth
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser !== null) {
      const getUser = firebaseGetUserDataById.getUserDataById(currentUser.uid);
      const fetchData = async () => {
        const results = await getUser;
        setUserData(results);
      };
      fetchData();
    } else {
      console.log("You are not logged in!");
    }
  }, []);

  const isSubscribed = userData.is_subscribed;

  return (
    <div>
      {!!isSubscribed ? (
        <div>
          <Grid container>
            <Grid item xs={4}>
              <Typography type="bold">Tipe Langganan</Typography>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Typography type="italic">Sudah Berlanggan!</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography type="bold">Masa Akhir Berlanggan</Typography>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Typography type="italic">{endDate}</Typography>
            </Grid>
          </Grid>
        </div>
      ) : (
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
              <Typography type="bold">Jumlah Kilas</Typography>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Typography type="italic">{number}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                round
                color="primary"
                href="/pricing"
                style={{
                  backgroundImage: "linear-gradient(to right, orange, yellow)",
                }}
              >
                Berlanggan Sekarang!
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
