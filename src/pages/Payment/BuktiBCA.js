import React from "react";
import buktiBCA from "../../images/bukti-bca.jpeg";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

const BuktiBCA = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img src={buktiBCA} />
    </Dialog>
  );
};

export default BuktiBCA;
