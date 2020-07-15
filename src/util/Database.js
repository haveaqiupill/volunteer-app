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

  static addResearchData(researcherUserId, researcherData) {
    return firebase
      .firestore()
      .collection("users")
      .doc(researcherUserId)
      .update(researcherData)
      .catch(error =>
        console.error("Error adding researcher details to DB: ", error)
      );
  }

  static addVolunteerData(userId, data) {
    // TODO
  }

  static addProgram(researcherUserId, programData, programTags) {
    const {
      title,
      date,
      venue,
      duration,
      compensation,
      type,
      number,
      description,
    } = programData;

    const data = {
      researcherUserId,
      title,
      description,
      type,
      number,
      tags: programTags,
      details: {
        date,
        compensation,
        venue,
        duration,
      },
    };

    return firebase
      .firestore()
      .collection("programs")
      .add(data)
      .then(docRef => docRef.id)
      .then(programId => {
        firebase
          .firestore()
          .collection("users")
          .doc(researcherUserId)
          .update({
            programIds: firebase.firestore.FieldValue.arrayUnion(programId),
          });
      });
  }

  static async getAllPrograms() {
    const querySnapshot = await firebase
      .firestore()
      .collection("programs")
      .get();
    const programs = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    return programs;
  }
}
