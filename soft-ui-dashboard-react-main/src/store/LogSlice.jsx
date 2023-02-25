import { createSlice } from "@reduxjs/toolkit";


const logSlice = createSlice({
    name: 'loginState',
    initialState: {
        isLoggedIn: false,
        user:{},
        passcode:'test'
    },
    reducers: {
        UserExists(state){
            state.isLoggedIn = true;
        },
        LogIn(state,action){
            state.isLoggedIn=true
            state.user=action.payload;
        },
        SignOut(state) {
            state.isLoggedIn=false
            state.user={};
        }
    }

}

)

export default logSlice;
export const loginActions = logSlice.actions;