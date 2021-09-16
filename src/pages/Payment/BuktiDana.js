import React from "react";
import buktiDana from "../../images/bukti-dana.png";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

const BuktiDana = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img style={{ width: 300, height: "auto" }} src={buktiDana} />
    </Dialog>
  );
};

export default BuktiDana;
