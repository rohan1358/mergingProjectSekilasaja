import React from "react";

// Material-UI components
import {
  IconButton,
  Container,
  makeStyles,
  Drawer,
  TextField,
} from "@material-ui/core";

// Custom components
import NavbarStyle from "../styles/NavbarStyle";

// nodejs library to set properties for component
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  list: {
    marginTop: "5px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
  },
  fullList: {
    width: "auto",
  },
});

export default function SearchBarDrawer(props) {
  const { logo, direction } = props;
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
    >
      <Container maxWidth={"xs"}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField fullWidth id="standard-basic" label="Search" />
        </form>
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

SearchBarDrawer.propTypes = {
  logo: PropTypes.object.isRequired,
  direction: PropTypes.string.isRequired,
};
