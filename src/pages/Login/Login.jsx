import React from "react";


function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="/login" method="POST">
          <label htmlFor="email" className="block text-sm font-medium text-gray-100">
            Email address
          </label>
          <input
            id="email"
            type="text"
            name="email"
            required
            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-100">
            Password
          </label>
          <input
            id="password"
            type="text"
            name="password"
            required
            className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-500 py-2 text-white hover:bg-indigo-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;