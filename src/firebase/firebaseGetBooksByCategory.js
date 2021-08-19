import fire from "./fire";
import BookInfo from ".././model/bookInfo";
import * as firebaseGetBookCoverImageURL from "./firebaseGetBookCoverImageURL.js";
import * as firebaseGetBookDashboardImageURL from "./firebaseGetBookDashboardImageURL.js";

const firestore = fire.firestore();

//Method for comparison by property in json array
function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;
    return 0;
  };
}

//Method to get books info with category
export async function getBooksByCategory(category) {
  //Make reference in firestore
  var docRef = firestore
    .collection("books")
    .where("category", "array-contains", category);

  //Initialize book object
  var results = [];

  try {
    var docs = await docRef.get();
    if (docs) {
      await docs.forEach(async (doc) => {
        var bookData = await doc.data();
        var bookInfo = new BookInfo();
        bookInfo.title = bookData["book_title"];
        bookInfo.author = bookData["author"];
        bookInfo.audioLink = bookData["audio_link"];
        bookInfo.category = bookData["category"];
        bookInfo.videoLink = bookData["video_link"];

        var bookRef = firestore.collection("books").doc(bookInfo.title);

        //Get kilasan
        var kilasanRef = bookRef.collection("kilasan");
        var kilasan = await kilasanRef.get();
        if (kilasan.docs) {
          var result = [];
          await kilasan.forEach((doc) => {
            var kilas = {
              id: parseInt(doc.id),
              title: doc.data()["title"],
              details: doc.data()["details"],
            };
            result.push(kilas);
          });
          result.sort(sortByProperty("id"));
          bookInfo.kilasan = result;
        }

        //Get ringkasan akhir
        var ringkasanRef = bookRef.collection("ringkasan_akhir");
        var ringkasanAkhir = await ringkasanRef.get();
        if (ringkasanAkhir.docs) {
          var result = [];
          await ringkasanAkhir.forEach((doc) => {
            result.push(doc.data());
          });
          bookInfo.ringkasanAkhir = result;
        }

        //Get link for book cover image
        var bookCoverImageURL =
          await firebaseGetBookCoverImageURL.getBookCoverImageURL(
            bookInfo.title
          );
        if (bookCoverImageURL) {
          bookInfo.bookCoverImageLink = bookCoverImageURL;
        }

        //Get link for book dashboard image
        var bookDashboardImageURL =
          await firebaseGetBookDashboardImageURL.getBookDashboardImageURL(
            bookInfo.title
          );
        if (bookDashboardImageURL) {
          bookInfo.bookDashboardImageLink = bookDashboardImageURL;
        }

        results.push(bookInfo);
      });
    }
    return results;
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}
