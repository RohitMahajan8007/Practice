import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { getMe } from '../Services/Auth.api.jsx';
import { setUser, setLoading } from '../Auth.slice.js';

export const AuthCheck = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await getMe();
                if (response && response.user) {
                    dispatch(setUser(response.user));
                } else {
                    dispatch(setUser(null));
                }
            } catch (error) {
                dispatch(setUser(null));
            } finally {
                dispatch(setLoading(false));
            }
        };

        checkUser();
    }, [dispatch]);

    return children;
};

export const Public = ({ children }) => {
    const user = useSelector(state => state.Auth.user);
    const loading = useSelector(state => state.Auth.loading);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return <Navigate to="/products" />;
    }

    return children;
};

const Protected = ({ children }) => {
    const user = useSelector(state => state.Auth.user);
    const loading = useSelector(state => state.Auth.loading);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default Protected;