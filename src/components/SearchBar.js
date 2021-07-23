import React from "react";

// Material-UI components
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

// Custom components
import SearchBarStyle from "../styles/SearchBarStyle";

// nodejs library to set properties for components
import classNames from "classnames";

export default function SearchBar() {
  const classes = SearchBarStyle();
  const searchClass = classNames({
    [classes.search]: true,
  });
  const searchIconClass = classNames({
    [classes.searchIcon]: true,
  });
  const inputRootClass = classNames({
    [classes.inputRoot]: true,
  });
  const inputInputClass = classNames({
    [classes.inputInput]: true,
  });

  return (
    <div className={searchClass}>
      <div className={searchIconClass}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: inputRootClass,
          input: inputInputClass,
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}
