import React, { useState, useEffect } from "react";

// Custom components
import CategoriesStyle from "../../styles/CategoriesStyle";
import CategoryButton from "./CategoryButton";

// Material UI components
import { Grid } from "@material-ui/core";

//nodejs library to set properties for components
import classNames from "classnames";

//Import firebase function to get books based on filter
import * as firebaseGetBookCategories from "../.././firebase/firebaseGetBookCategories.js";

function CategoryBarFilter({
  chosenCategory,
  setChosenCategory,
  setIsChosenCategory,
}) {
  // Styles
  const classes = CategoriesStyle();
  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });

  // useState hooks
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await firebaseGetBookCategories.getBookCategories();
      setCategories(results);
    };
    fetchData();
  }, []);

  return (
    <div className="CategoryBarFilter-Panel">
      <div className={desktopClass}>
        <Grid container justifyContent="center" spacing={1}>
          {categories.map((categoryName, index) => (
            <CategoryButton
              key={index}
              categoryIcon={categoryName}
              chosenCategory={chosenCategory}
              categoryName={categoryName}
              setChosenCategory={setChosenCategory}
              setIsChosenCategory={setIsChosenCategory}
            />
          ))}
        </Grid>
      </div>

      <div className={mobileClass}>
        {categories.map((categoryName, index) => (
          <CategoryButton
            key={index}
            categoryIcon={categoryName}
            chosenCategory={chosenCategory}
            categoryName={categoryName}
            setChosenCategory={setChosenCategory}
            setIsChosenCategory={setIsChosenCategory}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryBarFilter;
