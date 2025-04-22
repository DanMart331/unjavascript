'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import User from '../models/userSchema';
import Link from 'next/link';

export default function loginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    

  const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {      
        e.preventDefault();
        console.log("Submit");
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });

              //router.push('/home');
        } catch (e) {
            console.log("Invalid");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: name === 'owner' ? String(value) : value,
        }));
      };

return (    
    <div className="max-w-lg mx-auto mt-10 px-4 ">

        <h2 className="text-[50px] font-semibold mt-2 text-center">Log in</h2>
        <div>
        <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor='username' className="block text-lg font-large text-black-200 mb-0">Username: </label>
            <input
                name="username"
                type="text"        
                onChange={handleChange}
                placeholder="Username"
                value={formData.username}
                required
                className="w-full p-2 border-[2px] border-gray-500 rounded-[10px]"
            />
            <label htmlFor='password' className="block text-lg font-large text-black-200 mb-0">Password: </label>
          <input
            name="password"
            type="password"            
            onChange={handleChange}
            placeholder="Password"
            value={formData.password}
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
        <div className="flex justify-center">If you dont have an account...
            <Link rel="register" href="../register" className='text-blue-500 underline'>Register!</Link>
        </div>
      </div>
    </div>
  );  
};
    
