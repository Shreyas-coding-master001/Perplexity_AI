import React, { Suspense } from 'react'
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Protected from "../Features/auth/components/Protected.jsx";

const LandingPage = lazy(() => import("./LandingPage.jsx"));
const Login = lazy(() => import("../Features/auth/pages/Login.jsx"));
const Register = lazy(() => import("../Features/auth/pages/Register.jsx"));
const DashBorad = lazy(() => import("../Features/chat/pages/DashBorad.jsx"));

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
    {
        path : "/dashboard",
        element : <Protected>
            <Suspense fallback={<h2>Loading...</h2>} >
                <DashBorad />
            </Suspense>
        </Protected>
    },
    {
        path: "*",
        element: <Navigate to="/dashboard" replace />
    }

]);
