import React from "react";

// Material-UI components
import {
  IconButton,
  Container,
  makeStyles,
  Drawer,
  Divider,
} from "@material-ui/core";

// Custom components
import NavbarStyle from "../styles/NavbarStyle";
import Typography from "./Typography";
import { dangerColor, beigeColor } from "../styles/Style";

// nodejs library to set properties for component
import clsx from "clsx";

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  badge: {
    backgroundColor: dangerColor,
    border: "none",
    borderRadius: "10px",
    color: beigeColor,
    width: "1.5rem",
  },
});

export default function CustomDrawer({
  logo,
  children,
  drawerTitle,
  drawerLogo,
  direction,
  childrenCart,
}) {
  // Styles
  const classes = NavbarStyle();

  // Cart Drawer
  const drawer = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(drawer.list, {
        [drawer.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Container>
        <div className={classes.drawerTitle}>
          {drawerLogo}
          <Typography size="subheading">{drawerTitle}</Typography>
        </div>
        <Divider />

        <div onClick={toggleDrawer(anchor, false)}>{children}</div>
        <div>{childrenCart}</div>
      </Container>
    </div>
  );

  return (
    <div>
      {[direction].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)} color="inherit">
            {logo}
          </IconButton>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
