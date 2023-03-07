import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { toastActions } from "./toastSlice";
// import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

axios.defaults.baseURL = "http://34.235.34.12:7001/api/v1"

export const fetchTableData = createAsyncThunk(
    'table/fetchTableData',
    async (_, ThunkAPI) => {

        const { tform } = ThunkAPI.getState()
        const res = await axios.get(`/orders/guardian/${tform.select}`,
            // {
            //     'ClientID':'Client_Sofabed',
            // },
            {
                headers: {
                    'content-type': 'application/json',
                    // 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJhZG1pbiIsImlhdCI6MTY3NzI2MDYzOCwiZXhwIjoxNjc3MjY0MjM4fQ.2k3DXrUW0EhTXnWMIVcSd8EbxtYCcCV3ejFQimpoTlA'
                }
            }
        )
        return res.data
    }
)

export const updateOrder = createAsyncThunk(
    'table/updateOrder',
    async (ordernum, APIThunk) => {
        const { tform, loginState } = APIThunk.getState()

        await axios.put(`/orders/guardian/${tform.select}/${ordernum}`,
            {
                "OrderNumber": tform.input1,
                "OrderPeriod": tform.input2,
                "OrderModifiedBy": loginState.user.displayName
            }, {
            headers: { 'Content-Type': 'application/json' }
        }).then((res)=>{
            if((res.data.status).toLowerCase()==='success'){
                APIThunk.dispatch(toastActions.toastSuccess(res.data.message))
                APIThunk.dispatch(fetchTableData)
            }else{
                APIThunk.dispatch(toastActions.toastWarning(`${res.data.status} :`, res.data.message))
            } 
        }).catch((err)=>{
            APIThunk.dispatch(toastActions.toastError(err.message))
        })


    }
)

export const postOrder = createAsyncThunk(
    'table/postOrder',
    async (article, APIThunk) => {
        
        const { tform, loginState } = APIThunk.getState()
        await axios.post('/orders/guardian', {
            "ClientID": tform.select,
            "OrderNumber": article.orderno,
            "OrderPeriod": article.orderp,
            "OrderCreatedBy": loginState.user.displayName
        }, {
            headers: {
                'content-type': 'application/json',
                // 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJhZG1pbiIsImlhdCI6MTY3NzI2MDYzOCwiZXhwIjoxNjc3MjY0MjM4fQ.2k3DXrUW0EhTXnWMIVcSd8EbxtYCcCV3ejFQimpoTlA'
            }
        }).then((res)=>{
            if((res.data.status).toLowerCase()==='success'){
                APIThunk.dispatch(toastActions.toastSuccess(res.data.message))
                APIThunk.dispatch(fetchTableData)
            }else{
                APIThunk.dispatch(toastActions.toastWarning(`${res.data.status} :`, res.data.message))
            } 
        }).catch((err)=>{
            APIThunk.dispatch(toastActions.toastError(err.message))
        })
    }
)

const TableSlice = createSlice({
    name: 'table',
    initialState: {
        tableData: [],
        error: {},
        success: {},
        isPosted: true,
    },
    extraReducers(builder) {
        builder.addCase(fetchTableData.fulfilled, (state, action) => {
            state.isPosted ? state.tableData = action.payload : state
            state.isPosted = false
        })
        builder.addCase(fetchTableData.rejected, (state, action) => {
            state.error = action.payload;
            state.isPosted = false
        })
        builder.addCase(postOrder.fulfilled, (state, action) => {
            state.success = action.payload;
            state.isPosted = true
        })
        builder.addCase(postOrder.rejected, (state, action) => {
            action.payload ? state.error = action.payload : state
        })
        builder.addCase(updateOrder.fulfilled, (state, action) => {
            state.success = action.payload;
            state.isPosted = true
        })
        builder.addCase(updateOrder.rejected, (state, action) => {
            action.payload ? state.error = action.payload : state
        })
    },
})
export default TableSlice;
export const TableActions = TableSlice.actions;

