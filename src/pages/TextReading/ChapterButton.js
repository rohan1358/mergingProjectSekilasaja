import React, { useState, useEffect } from "react";

// Custom components
import TextReadingStyle from "../../styles/TextReadingStyle";
import { toggleDrawer } from "../../components/Drawer";

//nodejs library to set properties for components
import classNames from "classnames";

function ChapterButton({ chosenChapter, setChosenChapter, chapter }) {
  // Styles
  const classes = TextReadingStyle();

  // useState hooks
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
        window.scrollTo(0, 0);
      }}
      className={btnClass}
    >
      {/* {"Kilas #" + chapter.id + " : " + chapter.content.title} */}
      {chapter.content.title === undefined
        ? "Ringkasan Akhir"
        : "Kilas #" + chapter.content.kilas + " : " + chapter.content.title}
    </div>
  );
}

export default ChapterButton;
