import { createSlice } from "@reduxjs/toolkit";

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
            window.location.reload()
            
            // state.reload=false
        },
        // setReload(state){
        //     state.reload=true
        // }
    }
})

export default TForm;
export const TFormActions = TForm.actions;