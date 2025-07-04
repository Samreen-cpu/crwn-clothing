import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { signInWithGooglePopup,
     createUserDocumentFromAuth,
     signInAuthUserWithEmailAndPassword,
 } 
from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";


const deafultformfields={
    email:'',
    password:'',
};
const SignInForm=()=>{
    const [formfields, setformfields]=useState(deafultformfields);
    const {email,password}=formfields;
    
    // const {setCurrentUser}=useContext(UserContext);

    const resetFormFields=()=>{
        setformfields(deafultformfields);

    }
     const signInWithGoogle=async()=>{
        await signInWithGooglePopup();
        
            };

    const handleSubmit=async(event)=>{
        event.preventDefault();
       
        try{
            const {user}=await signInAuthUserWithEmailAndPassword(
                email,
                password,
            );
            // setCurrentUser(user);
        
            resetFormFields();
        }catch(error) {
  switch (error.code) {
    case 'auth/wrong-password':
      alert('Incorrect password');
      break;
    case 'auth/user-not-found':
      alert('No user associated with this email');
      break;
    case 'auth/invalid-email':
      alert('Invalid email format');
      break;
    default:
      console.log(error);
  }
}

    };

    const handleChange=(event)=>{
        const {name ,value}=event.target;
        setformfields({...formfields,[name]: value});
    };
    return(
        <div className="sign-up-container">
            <h2>Already Have an account?</h2>
            <span>Sign in with your email and password.</span>
            <form onSubmit={handleSubmit}>
                 
            
                <FormInput
                label="Email"
                type="email" 
                required
                onChange={handleChange} 
                name="email"
                value={email}/>

                 
                <FormInput
                label="Password"
                type="password" 
                required 
                onChange={handleChange} 
                name="password"
                value={password}/>
             <div className="buttons-container">
                 <Button  buttonType= "inverted" type="submit">Sign In</Button>
                 <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                
             </div>

                
            </form>
        </div>
    );
};
export default SignInForm;