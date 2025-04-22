'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



export default function registerPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'owner' ? String(value) : value,
    }));
  };

  const handlePWChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'owner' ? String(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormData({ username: '', password: '' });
      router.push('/login');
    } catch (error) {
      console.error('Error in CreateItem!', error);
    }
  };


  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
         <h2 className="text-[50px] font-semibold mt-2 text-center">Register</h2>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor='username' className="block text-lg font-large text-black-200 mb-0">Username: </label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-2 border-[2px] border-gray-500 rounded-[10px]"
          />
          <label htmlFor='username' className="block text-lg font-large text-black-200 mb-0">Password: </label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handlePWChange}
            placeholder="Password"
            required
            className="w-full p-2 border-[2px] border-gray-500 rounded-[10px]"
          />          
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-400 text-white text-[25px] px-4 py-2 rounded hover:bg-blue-600 mt-4 mb-2 justify-center"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex justify-center">Already have an account?...
            <Link rel="register" href="../login" className='text-blue-500 underline'>Log in!</Link>
        </div>
      </div>
    </div>
  );
  
};
    
