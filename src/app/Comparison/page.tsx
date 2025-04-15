'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Comparison from '../../components/Comparison';

export default function ComparisonsPage() {
  const [comparisons, setComparisons] = useState([
    { major: '', college1: '', college2: '' }
  ]);

  const [currentUser, setCurrentUser] = useState('Guest');

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) setCurrentUser(user);
  }, []);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...comparisons];
    updated[index][field as keyof typeof updated[0]] = value;
    setComparisons(updated);
  };

  const addComparison = (college1:string, college2:string, major:string) => {
    setComparisons([...comparisons, {major,college1,college2}])
  }

  const handleDelete = (index: number) => {
    
  };

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') return 'G';
    const words = name.trim().split(' ');
    return words.slice(0, 2).map(word => word[0].toUpperCase()).join('') || 'G';
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
            <Link href="/comparison" className="text-red-600 font-bold">Comparisons</Link>
            <Link href="/home" className="text-black hover:underline">Home</Link>
            <Link href="/reviews" className="text-black hover:underline">Reviews</Link>
            <Link href="/career" className="text-black hover:underline">Career Path</Link>
          </nav>
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <div className="comparison-page">
          {comparisons.map((item, index) => (
            <Comparison
              key={index}
              index={index}
              data={item}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          ))}
          <button style={{
            border: '1px solid',
            backgroundColor: 'Gainsboro',
            marginLeft: '30px',
            marginTop: '15px',
            paddingLeft: '5px',
            paddingRight: '5px'
          }} onClick={() => {
            addComparison("","","")
          }}>
            Click here to compare colleges
          </button>
        </div>
      </div>
    </div>
  );
}
