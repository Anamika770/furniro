"use client";

import Image from "next/image";
import sadiImage from "../utils/testing.jpg";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Image Section */}
      <div className="w-full flex justify-center">
        <Image src={sadiImage} alt="Login Image" className="h-[90vh]" />
      </div>

      {/* Form Section */}
      <div className="w-full px-4 py-2">
        <div className="text-md mb-4">
          dharma <span className="text-red-500">chakra</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl mb-6">Log in</h1>

          <form className="space-y-4 w-full max-w-md">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phoneNumberUser" className="block mb-1 font-medium">
                Phone No.:
              </label>
              <input
                type="text"
                id="phoneNumberUser"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block mb-1 font-medium">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
