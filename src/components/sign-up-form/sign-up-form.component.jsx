import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
const deafultformfields={
    displayName:'',
    email:'',
    password:'',
    confirmpassword:''
};
const Signupform=()=>{
    const [formfields, setformfields]=useState(deafultformfields);
    const {displayName,email,password,confirmpassword}=formfields;
    console.log(formfields);

    const resetFormFields=()=>{
        setformfields(deafultformfields);
    }
   

    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(password!==confirmpassword){
            alert("Passwords do not match");
            return;
        }
        try{
            const {user}= await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }catch(error){
            if (error.code==='auth/email-already-in-use'){
               alert("Cannot create user, email is already in use"); 
            }
            else{
            console.error('User creation encountered an error.',error)
            }

            }
    };

    const handleChange=(event)=>{
        const {name ,value}=event.target;
        setformfields({...formfields,[name]: value});
    };
    return(
        <div className="sign-up-container">
            <h2>Don't Have an account?</h2>
            <span>Sign up with your email and password.</span>
            <form onSubmit={handleSubmit}>
                 
                <FormInput 
                label="Display Name"
                type="text" 
                required
                onChange={handleChange}
                name="displayName" 
                value={displayName}
            />
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

               
                <FormInput
                label="Confirm password"
                type="password" required 
                onChange={handleChange} 
                name="confirmpassword" 
                value={confirmpassword}/>
                <Button  buttonType= "inverted" type="submit">Sign Up</Button>
                
                
            </form>
        </div>
    );
};
export default Signupform;