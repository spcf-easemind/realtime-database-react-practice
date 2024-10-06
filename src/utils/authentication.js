import { auth } from "../configs/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { addUserToFirestore } from "./firestore";

export function createUserAtFirebase({ email, password }) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        created_at: userCredential.user.metadata.createdAt,
      };
      addUserToFirestore(user);
    })
    .catch((error) => {
      console.error("Error creating user: ", error);
    });
}

export function signInUserAtFirebase({ email, password }) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        created_at: userCredential.user.metadata.createdAt,
      };
      addUserToFirestore(user);
    })
    .catch((error) => {
      console.error("Error signing in user:", error);
    });
}
