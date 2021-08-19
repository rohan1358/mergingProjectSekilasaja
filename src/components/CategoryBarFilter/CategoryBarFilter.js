import React, { useState, useEffect } from "react";
import data from "../../data/bookData";

// Custom components
import CategoriesStyle from "../../styles/CategoriesStyle";
import CategoryButton from "./CategoryButton";

//nodejs library to set properties for components
import classNames from "classnames";

//Import firebase function to get books based on filter
import * as firebaseGetBookCategories from "../.././firebase/firebaseGetBookCategories.js";

function CategoryBarFilter({
  chosenCategory,
  setChosenCategory,
  setIsChosenCategory,
}) {
  const classes = CategoriesStyle();

  const mobileClass = classNames({
    [classes.sectionMobile]: true,
  });
  const desktopClass = classNames({
    [classes.sectionDesktop]: true,
  });

  const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await firebaseGetBookCategories.getBookCategories();
            setCategories(results);
        };
        fetchData();
        
        //const _categories = data.products.map((book) => {
        //  return book.categories;
        //});
        
        //const _categoriesList = _categories.reduce((book1, book2) => {
        //  return book1.concat(book2);
        //});
        
        //const uniqueArray = _categoriesList.filter(function (item, pos) {
        //  return _categoriesList.indexOf(item) == pos;
        //});
        ////console.log(uniqueArray)
        //setCategories(uniqueArray);
    }, []);

  return (
    <div className="CategoryBarFilter-Panel">
      <div className={desktopClass}>
        {categories.map((categoryName, index) => (
          <CategoryButton
            key={index}
            chosenCategory={chosenCategory}
            categoryName={categoryName}
            setChosenCategory={setChosenCategory}
            setIsChosenCategory={setIsChosenCategory}
          ></CategoryButton>
        ))}
      </div>

      <div className={mobileClass}>
        {categories.map((categoryName, index) => (
          <CategoryButton
            key={index}
            chosenCategory={chosenCategory}
            categoryName={categoryName}
            setChosenCategory={setChosenCategory}
            setIsChosenCategory={setIsChosenCategory}
          ></CategoryButton>
        ))}
      </div>
    </div>
  );
}

export default CategoryBarFilter;
