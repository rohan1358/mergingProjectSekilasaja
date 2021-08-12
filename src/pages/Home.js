import React, { useState } from "react";
import Book from "../images/book.png";

// Custom components
import Typography from "../components/Typography";
import Parallax from "../components/Parallax";
import BenefitsBlock from "../components/BenefitsBlock";
import Button from "../components/Button";
import MultiUseMobile from "../styles/MultiUseMobile";
import CategoryBlock from "../components/CategoryBlock";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import data from "../data/bookData";

// Material-UI components
import { Container, Grid, Divider } from "@material-ui/core";

// nodejs library to set properties for components
import classNames from "classnames";

export default function Home() {
  const classes = MultiUseMobile();
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });

  // Add to Cart Feature
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        // cartItems.map((x) =>
        //   x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        // )
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <div>
      <NavBar cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
      <Parallax
        className={desktopClass}
        image={require("../images/home.png").default}
      >
        <Grid container>
          <Grid item xs={6}>
            <Typography size="heading">
              Daftar Sekarang Dan Dapatkan Ketiga Buku Ini Secara Gratis!
            </Typography>
            <Button href="/" round color="primary">
              Daftar Sekarang
            </Button>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <img src={Book} />
          </Grid>
        </Grid>
      </Parallax>

      <div className={mobileClass}>
        <Grid container>
          <Grid item xs={12}>
            <img src={Book} />
          </Grid>

          <Grid item xs={12}>
            <Container>
              <Typography size="heading">
                Daftar Sekarang Dan Dapatkan Ketiga Buku Ini Secara Gratis!
              </Typography>
              <Button fullWidth href="/" round color="primary">
                Daftar Sekarang
              </Button>
            </Container>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.extraSpace} />
            <Divider className={classes.dividerColor} />
          </Grid>
        </Grid>
      </div>

      <div className={classes.extraSpace} />

      <Container>
        <BenefitsBlock />
        <div className={classes.extraSpace} />
        <CategoryBlock
          title={"Temukan Kategori Kesukaan Kamu!"}
          products={products}
          onAdd={onAdd}
        />
      </Container>
      <Footer />
    </div>
  );
}
