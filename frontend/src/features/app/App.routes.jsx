import { createBrowserRouter } from "react-router";
import Register from "../auth/Pages/Register.jsx";
import Login from "../auth/Pages/Login.jsx";
import Product from "../products/Pages/Product.jsx";
import Protected, { Public } from "../auth/Components/Protected.jsx";

export const Route = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Product />
      </Protected>
    ),
  },

  {
    path: "/products",
    element: (
      <Protected>
        <Product />
      </Protected>
    ),
  },

  {
    path: "/register",
    element: (
      <Public>
        <Register />
      </Public>
    ),
  },

  {
    path: "/login",
    element: (
      <Public>
        <Login />
      </Public>
    ),
  },
]);