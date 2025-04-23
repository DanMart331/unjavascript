'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Page() {
  const router = useRouter();
  const { username } = useParams();

  const [formData, setFormData] = useState({
    password: '',
    preferredSchools: '',
  });

  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loggedInUsername = localStorage.getItem('username');

    if (isLoggedIn === 'true' && loggedInUsername === username) {
      setAuthorized(true);
      setCurrentUser(loggedInUsername || '');
    } else {
      setAuthorized(false);
      alert('You must be logged in to view this page.');
      router.push('/');
    }
  }, [username, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Profile changes saved!');
      } else {
        alert('Failed to save changes: ' + data.message);
      }

      setFormData({
        password: '',
        preferredSchools: '',
      });
    } catch (err) {
      console.error('Save error:', err);
      alert('Something went wrong.');
    }
  };

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') return '?';
    const words = name.trim().split(' ');
    return words.slice(0, 2).map(word => word[0].toUpperCase()).join('');
  };

  if (authorized === null || authorized === false) return null;

  return (
    <div className="p-6 w-full bg-[#FAFAF5] min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* NAVIGATION BAR */}
        <div className="flex justify-between items-center mb-4">
          <Link href={`/profile/${currentUser}`} className="flex items-center gap-3 hover:opacity-80">
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {getInitials(currentUser)}
            </div>
            <span className="text-xl font-semibold text-black">User</span>
          </Link>
          <nav className="flex space-x-10 text-lg font-semibold">
            <Link href="/comparison" className="text-black hover:underline">Comparisons</Link>
            <Link href="/home" className="text-black hover:underline">Home</Link>
            <Link href="/reviews" className="text-black hover:underline">Reviews</Link>
            { (localStorage.getItem('isLoggedIn') === "true")? 
            <Link href="/" onClick={() => {          
            localStorage.setItem('isLoggedIn', 'false');
              localStorage.setItem('username', '');
              document.cookie = "isLoggedIn=false";
            }} className="text-black hover:underline">Log Out</Link> :
            <Link href="/" onClick={() => {              
            }} className="text-black hover:underline">Log In</Link> 
            }                            
          </nav>
        </div>
        <hr className="my-4 border-t border-gray-300" />

        {/* PROFILE EDIT FORM */}
        <h1 className="text-4xl font-bold text-center mb-6">
          Welcome to your profile editor, <span className="text-blue-500">{username}</span>
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Feel free to update your personal information below.
        </p>

        <div className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-300">
          <div>
            <label className="block text-gray-700 text-lg mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-lg mb-2">Preferred Schools</label>
            <input
              name="preferredSchools"
              value={formData.preferredSchools}
              onChange={handleChange}
              placeholder="e.g. Harvard, MIT, Stanford"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-2 rounded-xl shadow-md"
            >
            Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}