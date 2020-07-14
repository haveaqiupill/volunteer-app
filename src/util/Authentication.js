import * as firebase from "firebase/app";
import "firebase/auth";

import Database from "./Database";

export default class Authentication {
  static signUp(email, password, firstName, lastName, userType = "") {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCred => {
        Database.addNewUser(userCred.user.uid, {
          firstName,
          lastName,
          userType,
          email,
        });
      })
      .catch(error => {
        console.log("Error occured while signing up: ", error);

        switch (error.code) {
          case "auth/weak-password":
            throw new Error(
              "Password is too weak! Please use a stronger password."
            );
          case "auth/invalid-email":
            throw new Error("Email is invalid! Please use a valid email.");
          case "auth/email-already-in-use":
            throw new Error(
              "Email is already in use! Please login or use another email."
            );
          case "auth/operation-not-allowed":
            console.error(
              "Enable email/password accounts in the Firebase Console, under the Auth tab."
            );
            break;
          default:
            throw error;
        }
      });
  }

  static signIn(email, password) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log("Error occured while signing in: ", error);

        switch (error.code) {
          case "auth/user-disabled":
            throw new Error(
              "Your account has been disabled, please contact us."
            );
          case "auth/invalid-email":
            throw new Error(
              "Email is invalid! Please login with a valid email."
            );
          case "auth/user-not-found":
            throw new Error("Your account is not found, please sign up!");
          case "auth/wrong-password":
            throw new Error(
              "Wrong password! Please enter your password correctly."
            );
          default:
            throw error;
        }
      });
  }

  static signOut() {
    firebase
      .auth()
      .signOut()
      .catch(error => console.log("Error occured while signing out: ", error));
  }

  static observeAuthState(observer) {
    firebase.auth().onAuthStateChanged(observer);
  }
}
