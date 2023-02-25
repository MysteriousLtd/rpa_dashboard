import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

axios.defaults.baseURL='http://34.235.34.12:7001/api/v1'

export const fetchTableData = createAsyncThunk(
    'table/fetchTable',
     async () => {
        const res=await axios.get('/orders/guardian', 
        // {
        //     'ClientID':'Client_Sofabed',
        // },
        //     {
        //         headers: {
        //             'content-type': 'application/json',
        //             // 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJhZG1pbiIsImlhdCI6MTY3NzI2MDYzOCwiZXhwIjoxNjc3MjY0MjM4fQ.2k3DXrUW0EhTXnWMIVcSd8EbxtYCcCV3ejFQimpoTlA'
        //         }
        //     }
        )
        console.log(res)
        return res.data
    }
)

export const postOrder = createAsyncThunk(
    'table/postOrder',
    async(order,dispatch)=>{
        await axios.post('http://34.235.34.12:7001/api/v1/orders/guardian',order,{
            headers:{
                'content-type': 'application/json',
                // 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJhZG1pbiIsImlhdCI6MTY3NzI2MDYzOCwiZXhwIjoxNjc3MjY0MjM4fQ.2k3DXrUW0EhTXnWMIVcSd8EbxtYCcCV3ejFQimpoTlA'
            }
        })
    }
)

const TableSlice = createSlice({
    name: 'table',
    initialState: { tableData: [],
    error:{} ,
    success:{}
},
extraReducers(builder){
        builder.addCase(fetchTableData.fulfilled, (state,action)=>{
            state.tableData=action.payload;
            console.log(action.payload)
        })
        builder.addCase(fetchTableData.rejected, (state,action)=>{
            state.error=action.payload;
            console.log(action.payload)
        })
        builder.addCase(postOrder.fulfilled, (state,action)=>{
            state.success=action.payload;
            
        })
        builder.addCase(postOrder.rejected, (state,action)=>{
            action.payload?state.error=action.payload:{}
        })
    },
})
export default TableSlice;
export  const TableActions= TableSlice.actions;

