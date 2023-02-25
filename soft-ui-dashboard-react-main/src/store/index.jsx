import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./LogSlice";
import TableSlice from "./TableSlice";

const store = configureStore({
    reducer: {
        loginState: logSlice.reducer,
        table: TableSlice.reducer
    }
})

export default store