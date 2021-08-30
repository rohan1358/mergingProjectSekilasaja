import React from "react";
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
      {/* <ChapterButton
          chosenChapter={chosenChapter}
          setChosenChapter={setChosenChapter}
          chapter={conclusion}
        ></ChapterButton> */}
    </div>
  );
}

export default TableOfContent;
