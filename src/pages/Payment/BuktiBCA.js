import React from "react";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

// Images
const buktiBCA =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fbukti-bca.jpeg?alt=media&token=a137ada5-62c1-4a7d-afc8-550011156a19";

const BuktiBCA = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img style={{ width: 300, height: "auto" }} src={buktiBCA} />
    </Dialog>
  );
};

export default BuktiBCA;
