import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../auth/Auth.slice.js";
import ProductReducer from "../products/Product.slice.js";


export const store = configureStore({
   reducer :{
      Auth : AuthReducer,
      Product : ProductReducer
   }
})