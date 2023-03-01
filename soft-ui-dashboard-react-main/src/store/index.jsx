import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./LogSlice";
import TableSlice from "./TableSlice";
import InventorySlice from "./inventorySlice";
import TForm from "./TForm";
const store = configureStore({
    reducer: {
        loginState: logSlice.reducer,
        table: TableSlice.reducer,
        inventory: InventorySlice.reducer,
        tform: TForm.reducer
    }
})

export default store