import React from "react";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

// Images
const buktiDANA =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fbukti-dana.png?alt=media&token=1b88a940-cf83-418f-a7f7-4c8cfd5ca4e3";

const BuktiDANA = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img style={{ width: 300, height: "auto" }} src={buktiDANA} />
    </Dialog>
  );
};

export default BuktiDANA;
