import { data } from "react-router";
import { setUser, setLoading, setError } from "../auth.slice.js";
import { login, register } from "../Services/Auth.api.jsx";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({ username, email, password }) {
    const data = await register({ email, username, password });

    dispatch(setUser(data.user));

    return data;
  }

  async function handleLogin({ email, password }) {
    const response = await login({ email, password });

    dispatch(setUser(data.user));

    return data;
  }

  return { handleRegister, handleLogin };
};
