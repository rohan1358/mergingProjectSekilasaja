const ParallaxStyle = {
  parallax: {
    height: "75vh",
    maxHeight: "1000px",
    overflow: "hidden",
    position: "relative",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center",
  },
  border: {
    marginTop: 18,
    borderRadius: 100,
  },
  filter: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: "-1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''",
    },
  },
  small: {
    height: "300px",
  },
  large: {
    height: "700px",
  },
};

export default ParallaxStyle;
