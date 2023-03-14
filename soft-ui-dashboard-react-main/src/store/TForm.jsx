import { createSlice } from "@reduxjs/toolkit";
// import { useLocation } from "react-router-dom";
// const {pathname} = useLocation();
const TForm= createSlice({
    name:'tform',
    initialState:{
        input1:'', //ordernumber/vendornumber
        input2:'', //orderperiod/ vendorsku
        select: '',
        // reload: true
    },
    reducers:{
        setInput1(state,action){
            state.input1=action.payload
        },
        setInput2(state,action){
            state.input2=action.payload
        },
        setSelect(state,action){
            state.select=action.payload
            // window.location.reload()
            // console.log(pathname)
            // state.reload=false
        },
        // setReload(state){
        //     state.reload=true
        // }
    }
})

export default TForm;
export const TFormActions = TForm.actions;