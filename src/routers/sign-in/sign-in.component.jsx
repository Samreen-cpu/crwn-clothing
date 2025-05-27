import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
const signin=()=>{
    const logGoogleUser=async()=>{
        const {user}=await signInWithGooglePopup();
        const userDocRef= await createUserDocumentFromAuth(user);
    };
    return(
        <div>
             <h1>This is my signin page.</h1>
             <button onClick={logGoogleUser}>
                Sign In with Google Popup.
             </button>

        </div>
       
    );

};
export default signin;