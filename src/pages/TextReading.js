import React from "react";

// Custom components
import NavBarSecond from "../components/NavBar/NavBarSecond";
import VideoComponent from "../components/VidPageComponent";

import TextReadingStyle from "../styles/TextReadingStyle";

//nodejs library to set properties for components
import classNames from "classnames";
import { useState, useEffect } from "react";
import db from "../fire";
import ChapterButton from "../components/TextReading/ChapterButton";

export default function VideoWatchingPage() {
  const classes = TextReadingStyle();
  const [book, setBooks] = useState([]);
  const [content, setContent] = useState([]);
  const [chosenChapter, setChosenChapter] = useState("1");

  useEffect(() => {
    db.collection('books').onSnapshot((snapshot) => {
      setBooks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          book: doc.data()
        })
      ))})
  }, [])

  useEffect(() => {
    db.collection('books').doc("Alibaba").collection("kilasan").onSnapshot((snapshot) => {
      setContent(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data()
        })
      ))})
  }, [])

  console.log(content);

  return (
    <div>
      <NavBarSecond />
      {content.length !== 0 && 
      (
        <div className={classes.page}>
        
        <div className={classes.tableOfContent}>
          {content.map((chapter, index) => (
               <ChapterButton chosenChapter={chosenChapter} setChosenChapter = {setChosenChapter} key = {index} chapter = {chapter}></ChapterButton>
              ))}
        </div>

        <div className={classes.container}>
          <div className={classes.title}>Kilas #{content[chosenChapter - 1].id}</div>
          <div className={classes.book_title}>Alibaba</div>
          <div className={classes.title}>{content[chosenChapter - 1].content.title}</div>
          <div className={classes.content}>
            {content[chosenChapter -1].content.details.map((paragraph, index) => (
              <div className={classes.paragraph}>{paragraph}</div>
            ))}
          </div>
        </div>
        
      </div>
      )}
      
    </div>
  );
}
