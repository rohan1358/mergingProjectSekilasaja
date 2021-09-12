import React, { useState } from "react";

// Custom components
import Typography from "../../components/Typography";
import { primaryColor } from "../../styles/Style";

// Material-UI components
import { Container, Collapse, ListItem, List } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

export default function FAQBar({ question, answer }) {
  // useState hooks
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem
        style={{
          backgroundColor: primaryColor,
          justifyContent: "space-between",
        }}
        button
        onClick={handleClick}
      >
        <Typography style={{ fontSize: "18px" }} type="bold">
          {question}
        </Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Container>{answer}</Container>
        </List>
      </Collapse>
    </div>
  );
}
