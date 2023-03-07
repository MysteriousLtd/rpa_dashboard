/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// react-router-dom components
import { Link } from "react-router-dom";

import { loginActions } from "../../../store/LogSlice";
import {auth,  createUserWithEmailAndPassword , updateProfile} from '../../../firebase'
import { toastActions } from "store/toastSlice";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// import Socials from "layouts/authentication/components/Socials";
// import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const dispatch = useDispatch()
  const [agreement, setAgremment] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passcode, setPasscode] = useState('')
  const [name, setName] = useState('')
  const [isCorrPC, setisCorrPC] = useState(null)
  const handleSetAgremment = () => setAgremment(!agreement);
  const PASSCODE= useSelector(state => state.loginState.passcode)
  const user=useSelector(state => state.loginState.user)
  const signUp=(e) => {
    if(passcode===PASSCODE){
       createUserWithEmailAndPassword(auth, email, password)
    // returns  an auth object after a successful authentication
    // userAuth.user contains all our user details
    .then((userAuth)=>{
      console.log(userAuth)
      // if((res.data.status).toLowerCase()==='success'){
         updateProfile(userAuth.user, {displayName:name}).then(() =>{
        // store the user's information in the redux state
        dispatch(
          loginActions.LogIn({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
            photoUrl: userAuth.user.photoURL,
          }))
          dispatch(toastActions.toastSuccess('Account Created Successfully'));
        })
  }).catch((err)=>{
      dispatch(toastActions.toastError(err.message))
  })
      setisCorrPC(true)
    }
    else{
      setisCorrPC(false)
    }
  }

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        {/* <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator /> */}
        <SoftBox pt={4} pb={3} px={3}>
          <SoftBox  component="form" role="form" >
            <SoftBox mb={2}>
              <SoftInput onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" onChange={e => setPasscode(e.target.value)} placeholder="Passcode" />
            </SoftBox>
            {isCorrPC===false && <h6 color="red">Invalid PassCode</h6>}
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton  variant="gradient" color="dark" fullWidth onClick={signUp}>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
