import fire from "./fire";
import BookInfo from ".././model/bookInfo";
import * as firebaseGetBookCoverImageURL from "./firebaseGetBookCoverImageURL.js";
import * as firebaseGetBookDashboardImageURL from "./firebaseGetBookDashboardImageURL.js";

const firestore = fire.firestore();

//Method for comparison by property in json array
function sortByProperty(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return 1;
        else if (a[property] < b[property])
            return -1;
        return 0;
    }
}

//Method to get book info with book title
export async function getBookInfoByTitle(title) {
    //References to book information in database
    var docRef = firestore.collection("books").doc(title);
    var kilasanRef = docRef.collection("kilasan");
    var ringkasanRef = docRef.collection("ringkasan_akhir");

    //Initialize book object
    var bookInfo = new BookInfo();

    //Initial get book data for initial fields
    try {
        var doc = await docRef.get();
        if (doc.exists) {
            var bookData = await doc.data();
            bookInfo.title = bookData["book_title"];
            bookInfo.author = bookData["author"];
            bookInfo.audioLink = bookData["audio_link"];
            bookInfo.category = bookData["category"];
            bookInfo.videoLink = bookData["video_link"];

            //Get kilasan
            var kilasan = await kilasanRef.get();
            if (kilasan.docs) {
                var result = [];
                kilasan.forEach((doc) => {
                    var kilas = {
                        id: parseInt(doc.id),
                        title: doc.data()['title'],
                        details: doc.data()['details']
                    }
                    result.push(kilas);
                });
                result.sort(sortByProperty("id"));
                bookInfo.kilasan = result;
            }

            //Get ringkasan akhir
            var ringkasanAkhir = await ringkasanRef.get();
            if (ringkasanAkhir.docs) {
                var result = [];
                ringkasanAkhir.forEach((doc) => {
                    result.push(doc.data());
                });
                bookInfo.ringkasanAkhir = result;
            }

            //Get link for book cover image
            var bookCoverImageURL = await firebaseGetBookCoverImageURL.getBookCoverImageURL(bookInfo.title);
            if (bookCoverImageURL) {
                bookInfo.bookCoverImageLink = bookCoverImageURL;
            }

            //Get link for book dashboard image
            var bookDashboardImageURL = await firebaseGetBookDashboardImageURL.getBookDashboardImageURL(bookInfo.title);
            if (bookDashboardImageURL) {
                bookInfo.bookCoverDashboardLink = bookDashboardImageURL;
            }

            return bookInfo;
        } 
    } catch(err) {
        var errorCode = err.code;
        var errorMessage = err.message;
        console.log("Error: " + errorCode + "\n\n" + errorMessage);
    };
}
