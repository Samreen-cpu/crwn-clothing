import { Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { Outlet, Link } from "react-router-dom";
import {ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import './navigation.style.jsx';
import { UserContext } from "../../context/user.context.";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { NavigationContainer,NavLink,NavLinks,LogoContainer } from "./navigation.style";

const Navigation=()=>{
    const{currentUser}=useContext(UserContext);
    const{isCartOpen}=useContext(CartContext);
     const signOutUser = async () => {
    await signOutUser();
  };

    return(
        <Fragment>
            <NavigationContainer>
    
                <LogoContainer to='/'>
                < CrwnLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                     SHOP
                    </NavLink>
                    {
                        currentUser ?(
                            <NavLink as='span' onClick={signOutUser}>
                             SIGN OUT
                            </NavLink>
                        ):(
                                <NavLink to='/auth'>
                                       SIGN IN
                                </NavLink>
                            )
                    }
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
         
    );
};
export default Navigation;