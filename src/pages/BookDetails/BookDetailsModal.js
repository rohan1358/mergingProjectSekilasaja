import React from "react";
import Dialog from "@material-ui/core/Dialog";
import BookDetailsSimple from "./BookDetailsSimple";

const BookDetailsModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <BookDetailsSimple handleClose={handleClose} />
    </Dialog>
  );
};

export default LoginModalDialog;
