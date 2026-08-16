import React, { useState, useEffect } from 'react'
import {Navigate, useNavigate} from "react-router-dom";
import authHook from "../hooks/auth.hook.js";
import { useSelector } from 'react-redux';

const Login = () => {
  // 1. Initialize custom hooks and selectors first
  const { handleLogin, handleGetUser } = authHook();
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  // 2. Declare all useState hooks at the top level (moved from below the if statement)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // 3. Side effects (useEffect) go next
  useEffect(() => {
    async function callMe() {
      // handleGetUser is now safely initialized above this block
      const resp = await handleGetUser();
    }
    callMe();
  }, []);

  // 4. Conditional returns MUST come after ALL hook declarations
  if (user) {
    return <Navigate to="/dashborad" />
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
    const data = formData;

    const resp = await handleLogin(data);

    await navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="min-h-1/2 min-w-1/3 p-8 rounded-2xl border border-slate-700 bg-slate-900/80 shadow-2xl shadow-slate-950/40 backdrop-blur-sm">
        <div className="flex flex-col justify-center h-full mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">Welcome back</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Login</h1>
        </div>

        <div className="h-full flex flex-col justify-evenly space-y-5 ">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login;
