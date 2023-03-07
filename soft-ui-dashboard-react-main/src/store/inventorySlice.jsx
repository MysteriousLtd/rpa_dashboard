import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toastActions } from "./toastSlice";
import axios from "axios";

axios.defaults.baseURL = 'http://34.235.34.12:7001/api/v1'

export const fetchInventoryData = createAsyncThunk(
    'inventory/fetchInventoryData',
    async (_, ThunkAPI) => {
        const {tform} = ThunkAPI.getState()
        const res = await axios.get(`/inventory/products/${tform.select}`,
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

export const updateVendor = createAsyncThunk(
    'inventory/updateVendor',
     async ( psku , ThunkAPI ) => {
        const { tform, loginState } = ThunkAPI.getState();
         
         await axios.put('/inventory/products',
            {
                "ClientID": tform.select ,
                "productsku": psku,
                "vendorname": tform.input1,
                "vendorsku": tform.input2,
                "modified_by":loginState.user.displayName
        }
        , {
            headers: { 'Content-Type': 'application/json' }
        }).then((res)=>{
            if((res.data.status).toLowerCase()==='success'){
                ThunkAPI.dispatch(toastActions.toastSuccess(res.data.message))
                ThunkAPI.dispatch(fetchInventoryData)
            }else{
                ThunkAPI.dispatch(toastActions.toastWarning(`${res.data.status} :`, res.data.message))
            } 
        }).catch((err)=>{
            ThunkAPI.dispatch(toastActions.toastError(err.message))
        })
     }
)

// export const postOrder = createAsyncThunk(
//     'table/postOrder',
//     async (order) => {
//         await axios.post('http://34.235.34.12:7001/api/v1/orders/guardian', order, {
//             headers: {
//                 'content-type': 'application/json',
//                 // 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJhZG1pbiIsImlhdCI6MTY3NzI2MDYzOCwiZXhwIjoxNjc3MjY0MjM4fQ.2k3DXrUW0EhTXnWMIVcSd8EbxtYCcCV3ejFQimpoTlA'
//             }
//         })
//     }
// )

const InventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        inventoryData: [],
        error: {},
        success: {},
        isPosted: true,
    },
    extraReducers(builder) {
        // builder.addCase(fetchInventoryData.pending, (state,action)=>{
            
        // })
        builder.addCase(fetchInventoryData.fulfilled, (state, action) => {
            state.isPosted? state.inventoryData = action.payload :state
            state.isPosted = false
            // window.location.reload(false)
        })
        builder.addCase(fetchInventoryData.rejected, (state, action) => {
            state.error = action.payload;
            state.isPosted = false
        })
        // builder.addCase(postOrder.fulfilled, (state, action) => {
        //     state.success = action.payload;
        //     // state.isPosted = true
        // })
        // builder.addCase(postOrder.rejected, (state, action) => {
        //     action.payload ? state.error = action.payload : state
        // })
        builder.addCase(updateVendor.fulfilled, (state, action) => {
            state.success = action.payload;
            state.isPosted = true
        })
        builder.addCase(updateVendor.rejected, (state, action) => {
            action.payload ? state.error = action.payload : state

        })
    },
})
export default InventorySlice;
export const InventoryActions = InventorySlice.actions;

