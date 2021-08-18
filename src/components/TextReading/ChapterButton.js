import React, { useState, useEffect } from "react";

// Custom components
import TextReadingStyle from "../../styles/TextReadingStyle";

//nodejs library to set properties for components
import classNames from "classnames";

function ChapterButton({
  chosenChapter,
  setChosenChapter,
  chapter,
}) {
  const classes = TextReadingStyle();

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (chosenChapter === chapter.id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [chosenChapter]);


  var btnClass = classNames(classes.chapter, {
    [`${classes.selectedChapter}`]: isSelected,
  });

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setChosenChapter(chapter.id);
      }}
      className={btnClass}
    >
      {"Kilas #" + chapter.id + " : " + chapter.content.title}
    </div>
  );
}

export default ChapterButton;
