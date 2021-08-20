import React, { useState, useEffect } from "react";

// Custom components
import TextReadingStyle from "../../styles/TextReadingStyle";

//nodejs library to set properties for components
import classNames from "classnames";

function ChapterButton({ chosenChapter, setChosenChapter, chapter }) {
  const classes = TextReadingStyle();
  console.log(chapter)
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (chosenChapter === chapter.content.kilas) {
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
        setChosenChapter(chapter.content.kilas);
      }}
      className={btnClass}
    >
      {/* {"Kilas #" + chapter.id + " : " + chapter.content.title} */}
      {(chapter.content.title === undefined) ? ("Ringkasan") :("Kilas #" + chapter.content.kilas + " : " + chapter.content.title)}
    </div>
  );
}

export default ChapterButton;
