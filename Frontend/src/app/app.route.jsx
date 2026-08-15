import React, { Suspense } from 'react'
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LandingPage = lazy(() => import("./LandingPage.jsx"));
const Login = lazy(() => import("../Features/auth/pages/Login.jsx"));
const Register = lazy(() => import("../Features/auth/pages/Register.jsx"));

export const route = createBrowserRouter([
    {
        path : "/",
        element : 
        <Suspense fallback ={ <h2>Loading...</h2>}>
            <LandingPage />
        </Suspense>
    },
    {
        path : "/login",
        element : 
        <Suspense fallback ={ <h2>Loading...</h2>}>
            <Login />
        </Suspense>
    },
    {
        path : "/register",
        element : 
        <Suspense fallback ={ <h2>Loading...</h2>}>
            <Register />
        </Suspense>
    },
    
    {}
]);
