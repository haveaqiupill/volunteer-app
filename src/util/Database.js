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
      .update(researcherData);
  }

  static addVolunteerData(volunteerUserId, additionalData) {
    return firebase
      .firestore()
      .collection("users")
      .doc(volunteerUserId)
      .update(additionalData);
  }

  // returns an object containing user's data
  static async getUserData(userId) {
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    return doc.data();
  }

  // userIds: array of userIds
  // returns an object where key is userId and value is userData
  static async getUsersData(userIds) {
    if (userIds == null) {
      return {};
    }

    const querySnapshot = await firebase
      .firestore()
      .collection("users")
      .where(firebase.firestore.FieldPath.documentId(), "in", userIds)
      .get();

    const usersData = {};
    querySnapshot.docs.forEach(doc => {
      usersData[doc.id] = doc.data();
    });

    return usersData;
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

  // returns an array of all programs
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

  // returns an array of researcher's programs
  static async getResearchersPrograms(researcherUserId) {
    if (researcherUserId == null) {
      return;
    }

    const querySnapshot = await firebase
      .firestore()
      .collection("programs")
      .where("researcherUserId", "==", researcherUserId)
      .get();
    const programs = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    return programs;
  }

  static async applyProgram(programId, volunteerUserId) {
    const db = firebase.firestore();
    const batch = db.batch();

    const programRef = db.collection("programs").doc(programId);
    batch.update(programRef, {
      volunteerUserIds: firebase.firestore.FieldValue.arrayUnion(
        volunteerUserId
      ),
    });

    const userRef = db.collection("users").doc(volunteerUserId);
    batch.update(userRef, {
      registeredProgramIds: firebase.firestore.FieldValue.arrayUnion(programId),
    });

    return batch.commit();
  }

  static async programLikesActionHelper(isLike, programId, userId) {
    if (userId == null) {
      return;
    }

    const db = firebase.firestore();
    const batch = db.batch();

    const programRef = db.collection("programs").doc(programId);

    batch.update(programRef, {
      likedBy: isLike
        ? firebase.firestore.FieldValue.arrayUnion(userId)
        : firebase.firestore.FieldValue.arrayRemove(userId),
    });

    const userRef = db.collection("users").doc(userId);
    batch.update(userRef, {
      likedProgramIds: isLike
        ? firebase.firestore.FieldValue.arrayUnion(programId)
        : firebase.firestore.FieldValue.arrayRemove(programId),
    });

    return batch.commit();
  }

  static async likeProgram(programId, userId) {
    return this.programLikesActionHelper(true, programId, userId);
  }

  static async unlikeProgram(programId, userId) {
    return this.programLikesActionHelper(false, programId, userId);
  }
}
