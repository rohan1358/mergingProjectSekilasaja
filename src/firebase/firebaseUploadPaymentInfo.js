import fire from "./fire";
import firebase from "firebase";

const firestore = fire.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

//Method to upload payment info to store in firestore
export async function uploadPaymentInfo(userData, cartItems) {

  try {
      //Get total cost and items from cart items
      let total_cost = 0;
      let items = [];
      cartItems.forEach((item) => {
          let book = {"title" : item.book_title, "price" : item.price};
          items.push(book);
          total_cost += item.price;
      });

      //Get today's date for payment date
      const today = new Date(); //Date of payment

      //Upload payment image to firestore storage inside payments folder
      var date = today.getDate().toString();
      var month = today.getMonth() < 10 ? '0' + today.getMonth().toString() : today.getMonth().toString();
      var year = today.getFullYear().toString();
      var referenceName = date + month + year + "_" + userData.user.firstName + userData.user.lastName;
      console.log(referenceName);
      var refName = "Payments/" + referenceName;
      var imgRef = storage.ref().child(refName);

    //   const docRef = await firestore.collection("payments").add({
    //     email: userData.user.email,
    //     date: today,
    //     image_link: "test",
    //     info: {"items": items, "total_cost" : total_cost},
    //     type: "test",
    //   });

      //Put reference into payments array of user data
    //   console.log("ID: " + docRef.id);
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}
