import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { getFirestore,doc, getDoc,setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSKWkL9G_999jjsAzO1LoW_n6wH-1R6vk",
  authDomain: "crwn-clothing-db-b19bb.firebaseapp.com",
  projectId: "crwn-clothing-db-b19bb",
  storageBucket: "crwn-clothing-db-b19bb.firebasestorage.app",
  messagingSenderId: "176193313671",
  appId: "1:176193313671:web:4be1ef278aca807b7cd122"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const provider= new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"

}
);
export const auth=getAuth();
export const signInWithGooglePopup =()=>signInWithPopup(auth,provider);
export const db=getFirestore();
export const createUserDocumentFromAuth= async(userAuth)=>{
  const userDocRef= doc(db,'users', userAuth.uid);
  const userSnapshot=await getDoc(userDocRef);
 

if(!userSnapshot.exists()){
  const {displayName,email}=userAuth;
  const createdAt=new Date();

  try{
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt
    });
  } catch (error){
     console.log('Error creating the user', error.message);
  }
}
return userDocRef;
};