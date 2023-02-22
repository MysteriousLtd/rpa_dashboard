import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./LogSlice";

const store = configureStore({
    reducer: {
        loginState: logSlice.reducer
    }
})

export default store