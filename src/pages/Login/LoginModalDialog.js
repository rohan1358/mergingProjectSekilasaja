import React from "react";
import Dialog from "@material-ui/core/Dialog";
import LoginForm from "./LoginForm";

const LoginModalDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <LoginForm handleClose={handleClose} />
    </Dialog>
  );
};

export default LoginModalDialog;
