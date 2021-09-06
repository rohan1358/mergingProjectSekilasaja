import React from "react";
import Rdpd from "../../images/book.png";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

const ImagePreview = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <img src={Rdpd} />
    </Dialog>
  );
};

export default ImagePreview;
