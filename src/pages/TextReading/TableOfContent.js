import React from "react";

// Custom components
import ChapterButton from "./ChapterButton";

function TableOfContent({
  chapterContent,
  chosenChapter,
  setChosenChapter,
  classes,
}) {
  return (
    <div className={classes}>
      {chapterContent.map((chapter, index) => (
        <ChapterButton
          chosenChapter={chosenChapter}
          setChosenChapter={setChosenChapter}
          key={index}
          chapter={chapter}
        ></ChapterButton>
      ))}
    </div>
  );
}

export default TableOfContent;
