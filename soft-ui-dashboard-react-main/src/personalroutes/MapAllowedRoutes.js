// import React, {  memo } from 'react';
// import { Routes, Route, useMatch } from 'react-router-dom';
// import  NotFound  from 'components/common';
// import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
// // import { arrayOf, object, objectOf, shape } from 'prop-types';
// // import { chainPropTypes } from '@mui/utils';

// /*
// * This is the route utility component used for generating
// * routes and child routes it only requires routes array and basePath
// */
// function MapAllowedRoutes({routes, isAddNotFound}) {
//   const user=useSelector(state=> state.loginState.user)

//  console.log(routes)
//  return (
//   <Routes>
//    {routes.map((route) => {

//     const { 
//      path, 
//      component: Component,
//     //  children,
//      title,
//      permission,
//     //  ...rest 
//     } = route;
//     return (
//      <Route
//       // {...rest}
//       key={path}
//       exact path={path}
//       element={Component}
//      >
//       {children} 
//      </Route>
//     )
      
//    })}
//     {/* { user && ( isAddNotFound && <Route path={match?.pathname} element={<NotFound />}/>)} */}
//   </Routes>
//  )
// }

// MapAllowedRoutes.propTypes={
//   routes: PropTypes.array,
//   // basePath: PropTypes.string,
//   isAddNotFound: PropTypes.bool
// }


// export default MapAllowedRoutes;