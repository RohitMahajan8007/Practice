import { createBrowserRouter } from "react-router";
import Register from "../auth/Pages/Register.jsx";
import Login from "../auth/Pages/Login.jsx";


 export const Route = createBrowserRouter([
    {
        path : "/",
        element : <h1>Hello</h1>
    },

    {
        path : "/register",
        element : <Register />
    },
     {
        path : "/login",
        element : <Login />
     }
])