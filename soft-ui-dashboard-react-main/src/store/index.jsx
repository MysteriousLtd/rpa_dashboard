import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./LogSlice";
import TableSlice from "./TableSlice";
import InventorySlice from "./inventorySlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import {  } from "@reduxjs/toolkit";
// import { applyMiddleware } from "@reduxjs/toolkit";
import TForm from "./TForm";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'
// import { middleware } from "stylis";
// import { curryGetDefaultMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist:['loginState','tform']
// }

const loginPeristConfig={
    key: 'loginState',
    storage,
    whitelist:['isLoggedIn']
}

const formPeristConfig={
    key: 'tform',
    storage,
    whitelist:['select']
}

const rootReducer = combineReducers({
    loginState: persistReducer(loginPeristConfig ,logSlice.reducer),
    table: TableSlice.reducer,
    inventory: InventorySlice.reducer,
    tform: persistReducer(formPeristConfig, TForm.reducer)
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)



 const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
    // middleware:MiddlewareArray.concat(thunk)
})
// store = store.applyMiddleware()

export const persistor=persistStore(store)
export default store