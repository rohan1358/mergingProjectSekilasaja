import React from "react";

// Material-UI components
import {
  IconButton,
  Container,
  makeStyles,
  Drawer,
  Divider,
} from "@material-ui/core";
import MultiUseMobile from "../styles/MultiUseMobile";

// Custom components
import NavbarStyle from "../styles/NavbarStyle";
import Typography from "./Typography";

// nodejs library to set properties for component
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  list: {
    width: 400,
  },
  fullList: {
    width: "auto",
  },
});

export default function CustomDrawer(props) {
  const { logo, button, toPurchaseBookSection, drawerTitle, drawerLogo } =
    props;
  const classes = NavbarStyle();
  const spaces = MultiUseMobile();

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

        <div>{toPurchaseBookSection}</div>

        <div className={spaces.extraSpace} />

        {button}
      </Container>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
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

CustomDrawer.propTypes = {
  logo: PropTypes.object.isRequired,
  button: PropTypes.object,
  toPurchaseBookSection: PropTypes.object,
  drawerTitle: PropTypes.string,
  drawerLogo: PropTypes.object,
};
