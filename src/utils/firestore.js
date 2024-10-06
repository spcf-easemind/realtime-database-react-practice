import { firestore } from "../configs/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addUserToFirestore = async (user) => {
  if (!user) return;

  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: "Gabriel Alfonso Gatbonton",
    createdAt: user.created_at, // Add any other fields you want
  };

  console.log(userData);

  try {
    const docRef = await addDoc(collection(firestore, "users"), userData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
