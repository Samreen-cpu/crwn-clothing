import { initializeApp } from "firebase/app";
import {getAuth, 
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
   getFirestore,
   doc, 
   getDoc,
   setDoc,
   collection,
   writeBatch,
   query,
   getDocs,
   } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSKWkL9G_999jjsAzO1LoW_n6wH-1R6vk",
  authDomain: "crwn-clothing-db-b19bb.firebaseapp.com",
  projectId: "crwn-clothing-db-b19bb",
  storageBucket: "crwn-clothing-db-b19bb.firebasestorage.app",
  messagingSenderId: "176193313671",
  appId: "1:176193313671:web:4be1ef278aca807b7cd122"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const googleprovider= new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt: "select_account"

}
);
export const auth=getAuth();

export const signInWithGooglePopup =()=>signInWithPopup(auth,googleprovider);

export const signInWithGoogleRedirect=()=>
  signInWithRedirect(auth, googleprovider);
export const db=getFirestore();

export const addCollectionAndDocuments=async (
  collectionKey,
  objectstoAdd,
)=> {
  const collectionRef=collection(db,collectionKey);
  const batch=writeBatch(db);
  
  objectstoAdd.forEach((object)=>{
    const docRef=doc(collectionRef,object.title.toLowerCase());
    batch.set(docRef,object);
  });
  await batch.commit();
  console.log('done');
};


export const getCategoriesAndDocuments=async()=>{
  const collectionRef=collection(db,'categories');
  const q=query(collectionRef);

  const querySnapshot=await getDocs(q);
  const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
    const{items,title}=docSnapshot.data();
    acc[title.toLowerCase()]=items;
    return acc;
  },
  
  {});
  return categoryMap;
}
export const createUserDocumentFromAuth= async(
  userAuth,
  additionalInformation={}
)=>{
  if(!userAuth)return;
  const userDocRef= doc(db,'users', userAuth.uid);
  const userSnapshot=await getDoc(userDocRef);
 

if(!userSnapshot.exists()){

const {displayName,email}=userAuth;
  const createdAt=new Date();

  try{
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation,
    });
  } catch (error){
     console.log('Error creating the user', error.message);
  }
}
  return userDocRef;
};
export const createAuthUserWithEmailAndPassword=async (email,password) => {
  if (!email || !password)return;

  return await createUserWithEmailAndPassword(auth,email,password);
};
export const signInAuthUserWithEmailAndPassword=async (email,password) => {
  if (!email || !password)return;

  return await signInWithEmailAndPassword(auth,email,password);
};
export const signOutUser=async()=>await signOut(auth);

export  const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback);