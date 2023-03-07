/**
=========================================================
* RPA Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { auth, signInWithEmailAndPassword } from '../../../firebase'
// react-router-dom components
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastActions } from "store/toastSlice";
// @mui material components
import Switch from "@mui/material/Switch";

// RPA Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { loginActions } from "store/LogSlice";

function SignIn() {
  const dispatch=useDispatch()
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const signIn=() => {
    // Sign in an existing user with Firebase
    signInWithEmailAndPassword(auth, email, password)
      // returns  an auth object after a successful authentication
      // userAuth.user contains all our user details
      .then((userAuth)=>{
        console.log(userAuth)
        // if((res.data.status).toLowerCase()==='success'){
            dispatch(toastActions.toastSuccess('Logged in successfully'));
            dispatch(
              loginActions.LogIn({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrl: userAuth.user.photoURL,
              })
            );
        // }else{
        //     APIThunk.dispatch(toastActions.toastWarning(`${res.data.status} :`, res.data.message))
        // } 
    }).catch((err)=>{
        dispatch(toastActions.toastError(err.message))
    })
      
  }
  
  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold" >
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth
            onClick={signIn}>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular"

          >
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
