import React, { useState } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: '',
    avatarUrl: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    console.log('Register form submitted:', formData)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-violet-400">Create account</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Register</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>

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
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
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
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-medium text-slate-200">
              Role
            </label>
            <input
              id="role"
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="admin / user / moderator"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>

          <div>
            <label htmlFor="avatarUrl" className="mb-2 block text-sm font-medium text-slate-200">
              Avatar URL
            </label>
            <input
              id="avatarUrl"
              type="url"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-xl bg-violet-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register;
