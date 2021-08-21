import React from "react";
import Rdpd from "../../images/rdpd.jpg";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

// Custom component
import BookDetailsSimple from "./BookDetailsSimple";

const BookDetailsModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <BookDetailsSimple
        cover={Rdpd}
        handleClose={handleClose}
        title={"Rich Dad Poor Dad"}
        descriptionTitle={"Tentang apa?"}
        description={
          "Loren ipsun gama tele torapa usuede torapa maconorto opala operasito manuficito. Loren ipsun gama tele torapa usuede torapa maconorto opala operasito manuficito. Loren ipsun gama tele torapa usuede torapa maconorto opala operasito manuficito."
        }
      />
    </Dialog>
  );
};

export default BookDetailsModal;
