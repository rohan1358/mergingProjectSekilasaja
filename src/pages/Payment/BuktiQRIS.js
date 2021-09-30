import React from "react";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

// Images
const buktiQRIS =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fbukti-qris.png?alt=media&token=b6a8fcb9-2cbe-49be-82e4-d1ab4730aa85";

const BuktiQRIS = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img style={{ width: 300, height: "auto" }} src={buktiQRIS} />
    </Dialog>
  );
};

export default BuktiQRIS;
