import React from "react";
import ChapterButton from "../components/TextReading/ChapterButton";
import TextReadingStyle from "../styles/TextReadingStyle";

function TableOfContent({ content, chosenChapter, setChosenChapter }) {
  const classes = TextReadingStyle();
  return (
    <div className={classes.tableOfContent}>
      {content.map((chapter, index) => (
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
