import { createSlice } from "@reduxjs/toolkit";

const toastSlice= createSlice({
    name: 'toast',
    initialState: {
        message:'',
        open: false,
        severity:'',
    },
    reducers:{
        toastSuccess(state, action){
            console.log('reached toast')
            state.message=action.payload
            state.open=true
            state.severity='success'
            console.log(state.message, state.open, state.severity)

        },
        toastError(state, action){
            state.message=action.payload
            state.open=true
            state.severity='error'
        },
        toastSelect(state, action){
            state.message=`You're viewing ${action.payload}`
            state.open=true
            state.severity='info'
        },
        closeToast(state){
            state.open=false
        },
        toastInfo(state, action){
            state.message=action.payload
            state.open=true
            state.severity='info'
        },
        toastWarning(state, action){
            state.message=action.payload
            state.open=true
            state.severity='warning'
        },

    }
})

export default toastSlice
export const toastActions=toastSlice.actions