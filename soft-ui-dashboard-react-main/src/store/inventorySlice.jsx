import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
// import { Store } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'http://34.235.34.12:7001/api/v1'

export const fetchInventoryData = createAsyncThunk(
    'table/fetchInventory',
    async () => {
        const res = await axios.get('/inventory/products/Client_Sofabed',
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

export const updateVender = createAsyncThunk(
    'table/updateVender',
    async ({ orderno, updateVender }) => {
        
        await axios.put(`http://34.235.34.12:7001/api/v1/orders/guardian/${orderno}`, updateVender, {
            headers: { 'Content-Type': 'application/json' }
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
        builder.addCase(fetchInventoryData.fulfilled, (state, action) => {
            state.isPosted? state.inventoryData = action.payload :state
            state.isPosted = false
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
        builder.addCase(updateVender.fulfilled, (state, action) => {
            state.success = action.payload;
            state.isPosted = true
        })
        builder.addCase(updateVender.rejected, (state, action) => {
            action.payload ? state.error = action.payload : state
        })
    },
})
export default InventorySlice;
export const InventoryActions = InventorySlice.actions;

