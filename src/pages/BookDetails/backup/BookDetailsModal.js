import React from "react";

// Material UI component
import Dialog from "@material-ui/core/Dialog";

// Custom component
import BookDetailsModalContent from "./BookDetailsModalContent";

const BookDetailsModal = ({ open, handleClose, image }) => {
  const handleClose = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <BookDetailsModalContent
        cover={image}
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
