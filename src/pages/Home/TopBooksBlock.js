import React, { useEffect, useState } from "react";

// Material UI
import {
  Container,
  Paper,
  Grid,
  makeStyles,
  Tooltip,
  Divider,
} from "@material-ui/core";
import { ImportContacts, EmojiObjects, Videocam } from "@material-ui/icons";

// Custom components
import Typography from "../../components/Typography";
import InfoAreaStyle from "../../styles/InfoAreaStyle";
import { primaryColor, secondaryColor } from "../../styles/Style";
import Button from "../../components/Button";

// Firebase component
import * as firebaseGetBookInfoByTitle from "../../firebase/firebaseGetBookInfoByTitle";

const useStyles = makeStyles(InfoAreaStyle);
const useTopStyles = makeStyles((theme) => ({
  kilasDesc: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
    color: secondaryColor,
  },
  logo: {
    marginRight: "4px",
  },
}));

export default function TopBooksBlock({}) {
  // Styles
  const books = useStyles();
  const classes = useTopStyles();

  // useState hooks
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const book = await firebaseGetBookInfoByTitle.getBookInfoByTitle(
        "Alibaba"
      );
      setProduct(book);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Typography size="heading" style={{ textAlign: "center" }}>
        Kilas Of The Week
      </Typography>

      <Paper
        style={{ backgroundColor: primaryColor, padding: 20 }}
        elevation={5}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {/* Popular Book #1 */}
          <Grid item md={3} xs={12}>
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Cover_Images%2FAlibaba%20Cover.png?alt=media&token=d60797b3-9b1f-4eeb-8514-0d68bef05ed4"
              }
              className={books.imgRounded + " " + books.imgFluid}
              style={{ maxWidth: "200px", width: "100%" }}
            />
          </Grid>
          <Grid item md={9} xs={12}>
            <Typography size="subheading">Alibaba</Typography>

            <Divider />
            <div className={classes.kilasDesc}>
              <div className={classes.kilasDesc}>
                <Tooltip
                  title={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      <ImportContacts
                        fontSize="large"
                        style={{ marginRight: "10px" }}
                      />
                      Perkiraan waktu yang dibutuhkan untuk membaca kilas
                    </div>
                  }
                  placement="top"
                >
                  <ImportContacts className={classes.logo} />
                </Tooltip>
                <Typography type="bold">{product.read_time} Menit</Typography>
              </div>

              <div className={classes.kilasDesc}>
                <Tooltip
                  title={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      <Videocam
                        fontSize="large"
                        style={{ marginRight: "10px" }}
                      />
                      Waktu yang dibutuhkan untuk menonton video kilas
                    </div>
                  }
                  placement="top"
                >
                  <Videocam className={classes.logo} />
                </Tooltip>
                <Typography type="bold">{product.watch_time} Menit</Typography>
              </div>

              <div className={classes.kilasDesc}>
                <Tooltip
                  title={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      <EmojiObjects
                        fontSize="large"
                        style={{ marginRight: "10px" }}
                      />
                      Total kilas (bab) yang ada di setiap rangkuman
                    </div>
                  }
                  placement="top"
                >
                  <EmojiObjects className={classes.logo} />
                </Tooltip>
                <Typography type="bold">
                  {/* {product.kilasan.length} Kilas */}
                </Typography>
              </div>
            </div>
            <Divider />

            {/* {product.descriptions.map((paragraph, index) => (
              <Typography
                className={classes.uncopyable}
                className={classes.paragraph}
              >
                {paragraph}
              </Typography>
            ))} */}

            <Button
              style={{ marginTop: "30px" }}
              color="secondary"
              round
              href="/"
            >
              Baca Sekarang!
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
