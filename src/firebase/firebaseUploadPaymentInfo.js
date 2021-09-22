import fire from "./fire";
import firebase from "firebase";

const firestore = fire.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

//Method to upload payment info to store in firestore
export async function uploadPaymentInfo(
  userData,
  cartItems,
  image,
  total_cost,
  namaBank,
  nomorRekening,
  namaDiRekening,
  kodePromo,
  discountAmount
) {
  try {
    //Get total cost and items from cart items
    let total_cost = 0;
    let items = [];
    cartItems.forEach((item) => {
      let book = { title: item.book_title, price: item.price };
      items.push(book);
      total_cost += item.price;
    });

    //Decrease total cost by promo amount (add because discount amount is negative value)
    total_cost =
      total_cost + discountAmount > 0 ? total_cost + discountAmount : 0;

    //Get today's date for payment date
    const today = new Date(); //Date of payment

    //Upload payment image to firestore storage inside payments folder
    var date = today.getDate().toString();
    var month =
      today.getMonth() < 10
        ? "0" + today.getMonth().toString()
        : today.getMonth().toString();
    var year = today.getFullYear().toString();
    var referenceName = date + month + year + "_" + userData.user.firstName;
    // + userData.user.lastName;

    //Conditional checking to determine data type
    if (image.type.toString().includes("png")) {
      referenceName = referenceName + ".png";
    } else if (image.type.toString().includes("jpeg")) {
      referenceName = referenceName + ".jpg";
    }

    var refName = "Payments/" + referenceName;
    var exists = true;
    var imgRef = storage.ref().child(refName);
    var count = 0;
    //Check if image already exists in storage or not
    while (exists) {
      try {
        var image_url = await imgRef.getDownloadURL();
        //Check if count exists in the string
        if (referenceName.includes("_" + count)) {
          referenceName = referenceName.replace("_" + count, "");
        }
        count = count + 1;

        //Remove initial file prefix
        if (image.type.toString().includes("png")) {
          referenceName = referenceName.replace(".png", "");
        } else if (image.type.toString().includes("jpeg")) {
          referenceName = referenceName.replace(".jpg", "");
        }

        //Add new count for new transactions made by same user
        referenceName = referenceName + "_" + count;

        //Conditional checking to determine data type
        if (image.type.toString().includes("png")) {
          referenceName = referenceName + ".png";
        } else if (image.type.toString().includes("jpeg")) {
          referenceName = referenceName + ".jpg";
        }

        console.log(referenceName);
        refName = "Payments/" + referenceName;
        imgRef = storage.ref().child(refName);
      } catch (err) {
        exists = false;
      }
    }

    await imgRef.put(image).then((snapshot) => {
      console.log("UPLOADED IMAGE!");
    });

    //Get image uploaded link
    var image_url = await imgRef.getDownloadURL();
    const docRef = await firestore.collection("payments").add({
      fn: userData.user.firstName,
      // ln: userData.user.lastName,
      phoneNumber: userData.user.phoneNumber,
      email: userData.user.email,
      date: today,
      image_link: image_url,
      info: { items: items, total_cost: total_cost },
      nama_di_rekening: namaDiRekening,
      nomor_rekening: nomorRekening,
      nama_bank: namaBank,
      // akun_telegram: akunTelegram,
      kode_promo: kodePromo,
      promo_discount_amount: discountAmount,
    });

    //Put reference into payments array of user data
    //   console.log("ID: " + docRef.id);
    //Return the download link for image
    return image_url;
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}
