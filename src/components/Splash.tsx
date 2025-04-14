'use client';
import Link from 'next/link';

const Welcome = () => { 
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
      <h1 style={{ fontSize:'32px'}} className="text-2xl font-bold text-white-800">Welcome</h1>
      <p style={{ fontSize:'22px'}} className="text-lg md:text-xl max-w-2xl mb-10">
        This website allows you to compare the same major from different schools,
        allowing you to see what each school has to offer and which school aligns more with your interest.
      </p>
      <div className="flex gap-6">
        <a href="http://localhost:3000/register">
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-6 py-2 rounded transition duration-300">
          Register
        </button>
        </a>
        <a href="http://localhost:3000/login">
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-6 py-2 rounded transition duration-300">
          Login
        </button>
        </a>
      </div>
      </div>
    )};
export default Welcome;