import imgTesting from "./utils/testing.jpg";
import React, { useState } from "react";
function handlesubmit(a,b) {
                
              }
export default function First() {
  const [text, setText] = useState("");

  return (
    <div className="flex min-h-screen">
      {/* Left side image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgTesting.src})` }}
      ></div>

      {/* Right side form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
          <form action="/api/auth/signup" method="POST" className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
                <button
                type="button" 
              onClick={handlesubmit}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
            
            >
              Sign Up
            </button>
          </form>

          {text && (
            <p className="mt-4 text-center text-green-600 font-medium">
              {text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
