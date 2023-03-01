import { createSlice } from "@reduxjs/toolkit";

const TForm= createSlice({
    name:'tform',
    initialState:{
        input1:'', //ordernumber/vendornumber
        input2:'', //orderperiod/ vendorsku
    },
    reducers:{
        setInput1(state,action){
            state.input1=action.payload
        },
        setInput2(state,action){
            state.input2=action.payload
        }
    }
})

export default TForm;
export const TFormActions = TForm.actions;