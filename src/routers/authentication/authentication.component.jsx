


import Signupform from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss';
const Authentication=()=>{
  
    return(
        <div className="authentication-container">
             <SignInForm/>
          
             <Signupform/>

        </div>
       
    );
};

export default Authentication;