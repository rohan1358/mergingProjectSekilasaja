import React from "react";
import buktiOVO from "../../images/bukti-ovo.png";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

const BuktiOVO = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img style={{ width: 300, height: "auto" }} src={buktiOVO} />
    </Dialog>
  );
};

export default BuktiOVO;
