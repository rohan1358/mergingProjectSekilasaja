import db from "./fire";

const auth = db.auth();

export function login(email, password) {
    auth
        .signInWithEmailAndPassword(email, password)
        .then((resp) => {
            console.log("Firebase login suceeded!");
        })
        .catch((err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log("Error: " + errorCode + "\n\n" + errorMessage);
        });
}