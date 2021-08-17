import fire from "./fire";

const auth = fire.auth();
const firestore = fire.firestore();

export function signUp(email, password, firstName, lastName, phoneNumber) {
    auth
        .createUserWithEmailAndPassword(email, password)
        .then((resp) => {
            //Store the new user information in the database via firestore
            firestore.collection("users").doc(resp.user.uid).set({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                owned_books: [],
                favorite_books: [],
                is_subscribed: false
            });
            //Sign up success case
            console.log("Firebase signup suceeded!");
        })
        .catch((err) => {
            //Sign up fail case
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log("Error: " + errorCode + "\n\n" + errorMessage);
        });
}