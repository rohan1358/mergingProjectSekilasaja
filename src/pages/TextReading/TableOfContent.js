import React from "react";
import ChapterButton from "./ChapterButton";
import TextReadingStyle from "../../styles/TextReadingStyle";

function TableOfchapterContent({
  chapterContent,
  chosenChapter,
  setChosenChapter,
  conclusion,
}) {
  const classes = TextReadingStyle();
  return (
    <div className={classes.tableOfchapterContent}>
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

export default TableOfchapterContent;
