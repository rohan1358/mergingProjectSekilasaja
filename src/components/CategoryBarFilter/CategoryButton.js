import React, { useState, useEffect } from "react";
import BusinessIcon from "@material-ui/icons/Business";
// Custom components
import CategoriesStyle from "../../styles/CategoriesStyle";
import MultiUseMobile from "../../styles/MultiUseMobile";

//nodejs library to set properties for components
import classNames from "classnames";

// Material UI components
import { Grid } from "@material-ui/core";

function CategoryButton({
  chosenCategory,
  categoryName,
  setChosenCategory,
  setIsChosenCategory,
}) {
  const classes = CategoriesStyle();
  const multi = MultiUseMobile();

  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (chosenCategory === categoryName) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [chosenCategory]);

  var btnClass = classNames(classes.button, {
    [`${classes.selectedButton}`]: isSelected,
  });
  return (
    <Grid item>
      <div
        className={btnClass}
        color="secondary"
        onClick={(e) => {
          e.preventDefault();
          setChosenCategory(categoryName);
          setIsChosenCategory(true);
        }}
      >
        {/* <BusinessIcon /> */}
        <div className={classes.text}>{categoryName}</div>
      </div>
    </Grid>
  );
}

export default CategoryButton;
