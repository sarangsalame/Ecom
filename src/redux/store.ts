import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./features/formSlice";
import loginSlice from "./features/loginSlice";
import AddProductToCardReducer from './features/addPoductToCartSlice'

 const store = configureStore({
    reducer:{
        form:formSlice,
        login:loginSlice,
        cart:AddProductToCardReducer
        
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;