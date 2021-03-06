const ImagesStyle = {
  imgBestValue: {
    maxWidth: "100px",
    width: "100%",
  },
  imgLogoText: {
    width: "220px",
    padding: "10px",
  },
  imgHomePNG: {
    display: "flex",
    maxWidth: "400px",
    width: "100%",
  },
  imgWhatsappLogo: {
    width: "60px",
    "&:hover": {
      filter: "brightness(150%)",
    },
  },
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
  imgRounded: {
    borderRadius: "6px !important",
  },
  imgRoundedCircle: {
    borderRadius: "50% !important",
  },
  imgRaised: {
    boxShadow:
      "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  imgGallery: {
    width: "100%",
    marginBottom: "2.142rem",
  },
  imgCardTop: {
    width: "100%",
    borderTopLeftRadius: "calc(.25rem - 1px)",
    borderTopRightRadius: "calc(.25rem - 1px)",
  },
  imgCardBottom: {
    width: "100%",
    borderBottomLeftRadius: "calc(.25rem - 1px)",
    borderBottomRightRadius: "calc(.25rem - 1px)",
  },
  imgCard: {
    width: "100%",
    borderRadius: "calc(.25rem - 1px)",
  },
  imgCardOverlay: {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    padding: "1.25rem",
  },
  imgBookCover: {
    marginTop: "10px",
    width: "100%",
    maxWidth: "200px",
  },
  imgBookDetailsCover: {
    marginTop: "10px",
    width: "100%",
    maxWidth: "250px",
  },
  imgHomeBook: {
    width: "100%",
    maxWidth: "170px",
    padding: "5px",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.5)",
    },
  },
  imgNewHomeBook: {
    width: "100%",
    maxWidth: "250px",
    padding: "5px",
    "&:hover": {
      filter: "brightness(150%)",
    },
  },
  imgLibraryNewBook: {
    width: "100%",
    maxWidth: "100px",
    padding: 2,
    // transition: "transform .2s",
    // "&:hover": {
    //   transform: "scale(1.5)",
    // },
  },
  imgBookComingSoon: {
    marginTop: "10px",
    width: "100%",
    maxWidth: "120px",
  },
  videoWidth: {
    marginTop: "20px",
    width: "100%",
    maxWidth: "800px",
  },
};

export default ImagesStyle;
