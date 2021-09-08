import React from "react";
import Rdpd from "../../images/book.png";

// Material UI component
import Dialog from "@material-ui/core/Dialog";
import { beigeColor } from "../../styles/Style";

const ImagePreview = ({ open, handleClose }) => {
  return (
    <Dialog
      style={{ backgroundColor: beigeColor }}
      open={open}
      onClose={handleClose}
    >
      <img src={Rdpd} />
    </Dialog>
  );
};

export default ImagePreview;
