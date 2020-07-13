import * as firebase from "firebase/app";
import "firebase/firestore";

export default class Database {
  static addNewUser(userId, userData) {
    // TODO: update rules on firebase db console
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .set(userData)
      .catch(error => console.error("Error adding user to DB: ", error));
  }

  static addResearchData(userId, data) {
    // TODO
  }

  static addVolunteerData(userId, data) {
    // TODO
  }
}
