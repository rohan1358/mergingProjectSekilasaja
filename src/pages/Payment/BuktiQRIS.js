import React from "react";
import buktiQRIS from "../../images/bukti-qris.png";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

const BuktiQRIS = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img style={{ width: 300, height: "auto" }} src={buktiQRIS} />
    </Dialog>
  );
};

export default BuktiQRIS;
