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
// import EnhancedTable from "examples/CustomTable/Table";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";

// react-router components
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// RPA Dashboard React components
import SoftBox from "components/SoftBox";

// RPA Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// RPA Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// RPA Dashboard React routes
import routes from "utils/routes";

// RPA Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";
// import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
// import { element } from "prop-types";
// import Dashboard from "layouts/dashboard";
import { auth, onAuthStateChanged } from "utils/firebase";
import { loginActions } from "./store/LogSlice";
// import { getAuth } from "firebase/auth";
import { toastActions } from "store/toastSlice";



export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  // const { pathname } = useLocation();
  const dispatchR = useDispatch()
  const { message, severity, open } = useSelector(state => state.toast)
  const isLoggedIn = useSelector(state => state.loginState.isLoggedIn)
  // const navigate=useNavigate()
  const LoggedInUser = () => {
onAuthStateChanged(auth, (currUser) => {
      if (currUser && currUser.displayName) {
        return dispatchR(loginActions.LogIn({
          email: currUser.email,
          uid: currUser.uid,
          displayName: currUser.displayName,
          photoUrl: currUser.photoURL,
        }))
      }
    })

    // const handleClose = (event, reason) => {
    //   if (reason === 'clickaway') {
    //     return;
    //   }
    // };
  }
  const closeToast=()=>{
    dispatchR(toastActions.closeToast())
  }
  const toast = () => {
    return <Snackbar open={open} autoHideDuration={4000} onClose={closeToast}>
    <Alert onClose={closeToast} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
      
    }
    //* // onClose={handleClose}
     /* <Alert onClose={closeToast} variant='filled' severity={severity} sx={{ width: '100%' }}>
        {message} // action={action}
      </Alert> */ 

  // const history= useHistory()

  useEffect(() => {
    LoggedInUser()
  }, [isLoggedIn])


  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // const isLoggedIn = useSelector(state => state.loginState.isLoggedIn);


  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  // useEffect(() => {
  //   document.body.setAttribute("dir", direction);
  // }, [direction]);

  // Setting page scroll to 0 when changing the route
  // useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  // }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {isLoggedIn && layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName="Dashboard"
              routes={routes.slice(0, 4)}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes.slice(0, 4))}
          {isLoggedIn && (<><Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/product-inventory" element={<Navigate to="/product-inventory" />} />
          </>)}
        </Routes>

      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn && layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Dashboard"
            routes={routes.slice(0, 4)}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}

      {layout === "vr" && <Configurator />}
      {open && toast()}
      <Routes>
        {/* {console.log(LoggedInUser)} */}
        {isLoggedIn ? getRoutes(routes.slice(0, 4)) : getRoutes(routes.slice(4))}
        {!isLoggedIn ? <>
          <Route path='*' element={<Navigate to='/authentication/sign-in' />} />
          <Route path='/authentication/sign-up' element={<SignUp />} />
        </>
          : <>
            <Route path='/guardian-order' element={<Navigate to='/guardian-order' />} />
            <Route path='/product-inventory' element={<Navigate to='/product-inventory' />} />
            <Route path='*' element={<Navigate to='/dashboard' />} />
          </>
        }
      </Routes>
     
    </ThemeProvider>
  );
}