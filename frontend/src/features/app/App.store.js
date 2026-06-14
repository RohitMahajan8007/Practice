import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../auth/Auth.slice.js";


export const store = configureStore({
   reducer :{
      Auth : AuthReducer
   }
})