import { createSlice } from "@reduxjs/toolkit";
// import routes from 'utils/routes'

const logSlice = createSlice({
    name: 'loginState',
    initialState: {
        isLoggedIn: false,
        user:{role:'Client_Sofabed_ADMIN'},
        passcode:'test',
        // routes:routes.slice(0,2)
    },
    reducers: {
        // UserExists(state){
        //     state.isLoggedIn = true;
        // },
        LogIn(state,action){
            // state.routes=routes.slice(2)
            state.user={...state.user, ...action.payload};
            if(state.user) {
                state.isLoggedIn=true
            } 
            window.location.reload(false)
        },
        SignOut(state) {
            // state.routes=routes.slice(0,2)
            state.isLoggedIn=false
            state.user={};
            localStorage.clear()
            window.location.reload(false)
        }
    }

}

)

export default logSlice;
export const loginActions = logSlice.actions;