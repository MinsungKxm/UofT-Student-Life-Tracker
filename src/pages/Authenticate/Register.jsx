import React from "react";

/*
Ability: Twin Impact
 - Any 'surface' (even air) they strike, they can create a second impact either instantenously or after some time. The force of the impact can be ranged from the original one to its SQUARED version.

 - This makes the user seemingly a physical monster, able to dish out huge powerful punches and kicks, traverse fast throughout the battlefield by kicking off the air and moving fast. They're like dashing on air. 

 - They even uses the impact they strike on air when they're pulling back for a punch (like their elbow) to create a second impact, to make a punch move FASTER.

This movement, attack patterns, etc required heavy training (notably reaction time for flight) while also training martial arts, notably 
kyokushin karate and boxing. Though we see the user wearing a 'scouter', this is so the user knows where they created an impact. 


*/

function Register() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#002a5c]">
            <span className="text-xl font-bold text-white">U</span>
          </div>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500">
            Join UofT Student Life Tracker
          </p>
        </div>

        {/* Register Form
        
        
        */}
        <form
          className="space-y-5"
          action="http://localhost:3000/register"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="text"
              name="email"
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#002a5c] focus:ring-2 focus:ring-[#002a5c]/20"
              placeholder="your.email@utoronto.ca"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#002a5c] focus:ring-2 focus:ring-[#002a5c]/20"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#002a5c] py-3 font-semibold text-white transition hover:bg-[#003f87]"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-[#002a5c] hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;