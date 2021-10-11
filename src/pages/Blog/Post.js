import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

// Whatsapp Button
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Tooltip } from "@material-ui/core";

// Custom components
import Typography from "../../components/Typography";
import Footer from "../../components/Footer";
import Header from "../../components/NavBar/Header";
import HeaderLinks from "../../components/NavBar/HeaderLinks";
import HeaderLinksMobile from "../../components/NavBar/HeaderLinksMobile";
import Loading from "../Utilities/Loading";

// Material-UI components
import { Container } from "@material-ui/core";

// Sanity
import client from "../../sekilasajablog/client";
import BlockContent from "@sanity/block-content-to-react";

// Images
const Whatsapp =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2FWhatsapp.png?alt=media&token=88483bb9-b9d3-4aa8-9f14-9b7f91682861";

export default function Post({ history }) {
  const [singlePost, setSinglePost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
        title,
        body,
        mainImage {
          asset -> {
            _id,
            url
          },
          alt
        },
        "authorName": author -> name,
        "publishedDate": ""
      }`
      )
      .then((data) => setSinglePost(data[0]));
    setIsLoading(false);
  }, [slug]);

  console.log(singlePost);
  return (
    <>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
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
              {singlePost.title}
            </Typography>

            {singlePost.mainImage && singlePost.mainImage.asset && (
              <img
                style={{
                  width: "100%",
                }}
                src={singlePost.mainImage.asset.url}
                alt={singlePost.title}
              />
            )}

            <Typography>{singlePost.name}</Typography>
            <Typography>
              <BlockContent
                blocks={singlePost.body}
                projectId="2hp9gld0"
                dataset="production"
              />
            </Typography>
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
                  <WhatsAppIcon
                    fontSize="large"
                    style={{ marginRight: "10px" }}
                  />
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
      )}
    </>
  );
}
