import fire from "./fire";

const firestore = fire.firestore();

//Method to get all categories of books in firestore database
export async function AddToCart(userid, product) {
  //References to book information in database
  var docRef = firestore.collection("users").doc(userid).get();
  var cartItems = null;
  try {
    cartItems = await docRef.then((doc) => doc.data()["cart"])
    console.log(cartItems)
    const exist = cartItems.find((x) => x === product.book_title);
    console.log(exist)
    if (exist) {
       console.log("Already Added")
    } 
    else{
        cartItems = [...cartItems, product.book_title];
        console.log(product)
        firestore.collection("users").doc(userid).update({
            cart: cartItems
      });
    }
    return cartItems
  } catch (err) {
    var errorCode = err.code;
    var errorMessage = err.message;
    console.log("Error: " + errorCode + "\n\n" + errorMessage);
  }
}


