import React from "react";
import buktiBRI from "../../images/bukti-bri.jpeg";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

const BuktiBRI = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img style={{ width: 300, height: "auto" }} src={buktiBRI} />
    </Dialog>
  );
};

export default BuktiBRI;
