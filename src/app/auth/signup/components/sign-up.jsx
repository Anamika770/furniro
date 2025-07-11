'use client'
import Image from "next/image";
import sadiImage from "../utils/testing.jpg";


export default function SignUp() {

  function handlesubmit() {
    const name = document.getElementById('username').value;
    const email = document.getElementById('emailuser').value;
    const password = document.getElementById('passworduser').value;

    console.log("Name :-", name);
    console.log("email :-", email);
    console.log("password :-", password);
  }


  return (
      <div className="flex flex-col md:flex-row w-full ">

        <div className="w-full flex justify-center">
          <Image src={sadiImage} alt="Login Image" className="h-[90vh]" />
        </div>

        <div className="w-full px-4 py-2">
            <div className="text-md">dharma <span className="text-red-500">chakra</span></div>
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-3xl items-start mb-6">Log in</h1>
                <form className="space-y-4 w-full max-w-md">
                <div>
                    <label htmlFor="username" className="block mb-1 font-medium">
                    Username:
                    </label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="w-full testing px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                    Email:
                    </label>
                    <input
                    type="email"
                    id="emailuser"
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
                    id="passworduser"
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

            </div>
        </div>
      </div>
  );
}
