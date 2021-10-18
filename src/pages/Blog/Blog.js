import React, { useState, useEffect } from "react";

// Whatsapp Button
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Parallax from "../../components/Parallax";
import Typography from "../../components/Typography";
import Footer from "../../components/Footer";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";

// Material-UI components
import { Container, Grid } from "@material-ui/core";

// Sanity
import client from "../../sekilasajablog/client";

// Images
const Whatsapp =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2FWhatsapp.png?alt=media&token=88483bb9-b9d3-4aa8-9f14-9b7f91682861";

export default function BlogPage({ history }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
          title,
          slug,
          body,
          mainImage {
              asset -> {
                  _id,
                  url
              },
              alt
          }
      }`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <div style={{ marginTop: "100px" }} />
      <Header
        history={history}
        rightLinks={<HeaderLinks history={history} />}
        rightLinksMobile={<HeaderLinksMobile history={history} />}
        fixed
        color="white"
      />

      <Container maxWidth="md">
        <Typography style={{ textAlign: "center" }} size="heading">
          SekilasAja! Blog
        </Typography>
        {/* <Typography>Total artikel: {posts.length}</Typography> */}
        <Grid container direction="row" justifyContent="flex-start" spacing={3}>
          {posts.map((post) => (
            <Grid item key={post.slug.current}>
              {/* <article key={post.slug.current}> */}
              <a href={`/blog/${post.slug.current}`}>
                <div>
                  <img
                    style={{
                      width: "100%",
                      maxWidth: 300,
                      height: 150,
                      objectFit: "cover",
                    }}
                    src={post.mainImage.asset.url}
                    alt={post.title}
                  />
                </div>
              </a>

              <a
                style={{ textDecoration: "none" }}
                href={`/blog/${post.slug.current}`}
              >
                <Typography size="subheading">{post.title}</Typography>
              </a>
              {/* </article> */}
            </Grid>
          ))}
        </Grid>
      </Container>

      {/*---------------------------------------------------------------*/}
      {/*---------------------- WHATSAPP FIXED NAV ---------------------*/}
      {/*---------------------------------------------------------------*/}
      <a href="https://wa.me/message/JC5E4YLJBCKTE1" target="_blank">
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
              <WhatsAppIcon fontSize="large" style={{ marginRight: "10px" }} />
              Klik tombol ini dan langsung hubungi kami di Whatsapp bila ada
              pertanyaan!
            </div>
          }
          placement="right"
        >
          <img
            src={Whatsapp}
            style={{
              position: "fixed",
              bottom: 15,
              left: 15,
              width: "60px",
              "&:hover": {
                filter: "brightness(150%)",
              },
            }}
          />
        </Tooltip>
      </a>
      <Footer />
    </div>
  );
}
