import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

axios.defaults.baseURL = 'http://34.235.34.12:7001/api/v1'

export const fetchTableData = createAsyncThunk(
    'table/fetchTable',
    async () => {

        const res = await axios.get('/orders/guardian/Client_Sofabed',
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

        // console.log(res.data)
        return res.data
    }
)

export const updateOrder = createAsyncThunk(
    'table/updateOrder',
    async (orderno, { getState }) => {

        const { tform, loginState } = getState()
        // console.log(tform.input2, tform, orderno, )
        await axios.put(`http://34.235.34.12:7001/api/v1/orders/guardian/Client_Sofabed/${orderno}`,
            {
                "OrderNumber": tform.input1,
                "OrderPeriod": tform.input2,
                "OrderModifiedBy": loginState.user.displayName
            }, {
            headers: { 'Content-Type': 'application/json' 
        }
        })


    }
)

export const postOrder = createAsyncThunk(
    'table/postOrder',
    async (order) => {
        await axios.post('http://34.235.34.12:7001/api/v1/orders/guardian', order, {
            headers: {
                'content-type': 'application/json',
                // 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJhZG1pbiIsImlhdCI6MTY3NzI2MDYzOCwiZXhwIjoxNjc3MjY0MjM4fQ.2k3DXrUW0EhTXnWMIVcSd8EbxtYCcCV3ejFQimpoTlA'
            }
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

