import React from "react";
import ChapterButton from "./ChapterButton";
import TextReadingStyle from "../../styles/TextReadingStyle";

function TableOfContent({ chapterContent, chosenChapter, setChosenChapter }) {
  const classes = TextReadingStyle();
  return (
    <div className={classes.tableOfContent}>
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
