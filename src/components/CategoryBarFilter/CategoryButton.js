import React, { useState, useEffect } from "react";

// Custom components
import CategoriesStyle from "../../styles/CategoriesStyle";

//nodejs library to set properties for components
import classNames from "classnames";

// Material UI components
import { Grid } from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import EuroIcon from "@material-ui/icons/Euro";
import ForumIcon from "@material-ui/icons/Forum";

function CategoryButton({
  chosenCategory,
  categoryName,
  setChosenCategory,
  setIsChosenCategory,
  categoryIcon,
}) {
  const classes = CategoriesStyle();

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

  function categoryIcon() {
    if (categoryName === "All") return <PresentToAllIcon />;

    if (categoryName === "Business & Entrepreneurship") return <BusinessIcon />;

    if (categoryName === "Personal Development")
      return <AccessibilityNewIcon />;

    if (categoryName === "Biography") return <SupervisedUserCircleIcon />;

    if (categoryName === "Productivity") return <QueryBuilderIcon />;

    if (categoryName === "Cryptocurrency") return <MonetizationOnIcon />;

    if (categoryName === "Communication") return <ForumIcon />;

    if (categoryName === "Money & Investment") return <EuroIcon />;
  }

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
        {categoryIcon()}
        <div className={classes.text}>{categoryName}</div>
      </div>
    </Grid>
  );
}

export default CategoryButton;
