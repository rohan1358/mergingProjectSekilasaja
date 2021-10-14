import React from "react";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

// Images
const buktiOVO =
  "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Website_Images%2FWeb_Picture_Components%2Fbukti-ovo.png?alt=media&token=38c15076-1cd9-459e-9466-e2f798c327be";
const BuktiOVO = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img style={{ width: 300, height: "auto" }} src={buktiOVO} />
    </Dialog>
  );
};

export default BuktiOVO;
