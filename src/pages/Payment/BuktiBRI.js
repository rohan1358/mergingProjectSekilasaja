import React from "react";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

// Images
const buktiBRI =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fbukti-bri.jpeg?alt=media&token=53154366-72a6-4501-87ff-c4dfc6a19a98";

const BuktiBRI = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img style={{ width: 300, height: "auto" }} src={buktiBRI} />
    </Dialog>
  );
};

export default BuktiBRI;
