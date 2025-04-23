'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCookies, CookiesProvider } from 'react-cookie';

export default function loginPage() {
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [currentUser, setCurrentUser] = useState('Guest');
  const router = useRouter();

  

    const handleSubmit = async (e: React.FormEvent) => {      
        e.preventDefault();                         
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });

              if (response.status === 201) {
                localStorage.setItem('isLoggedIn', 'true');      
                document.cookie = "isLoggedIn=true";
                router.push('/home');
              } else {
                  alert("Invalid Credentials");                
              }
              
        } catch (e) {
            console.log("Invalid");
        }             
    }
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'owner' ? String(value) : value,
    }));
  };

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') return 'G';
    const words = name.trim().split(' ');
    return words.slice(0, 2).map((word) => word[0].toUpperCase()).join('') || 'G';
  };

  return (    
    <div className="bg-[#FAFAF5] min-h-screen px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href={currentUser === 'Guest' ? '/' : `/profile/${currentUser}`} className="flex items-center gap-3 hover:opacity-80">
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {getInitials(currentUser)}
            </div>
            <span className="text-xl font-semibold text-black">{currentUser}</span>
          </Link>
          <nav className="flex space-x-10 text-lg font-semibold">
            <Link href="/comparison" className="text-black hover:underline">Comparisons</Link>
            <Link href="/home" className="text-black hover:underline">Home</Link>
            <Link href="/reviews" className="text-black hover:underline">Reviews</Link>
          </nav>
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <h2 className="text-[50px] font-semibold mt-2 text-center">Log in</h2>
        <div className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-1">Username:</label>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full p-2 border-2 border-gray-500 rounded-lg bg-white"
            />
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">Password:</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-2 border-2 border-gray-500 rounded-lg bg-white"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white text-xl px-6 py-2 rounded hover:bg-blue-600 mt-4 mb-2"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="flex justify-center text-base mt-4">
            If you don't have an account...{' '}
            <Link rel="register" href="../register" className="text-blue-500 underline ml-1">Register!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

    
