'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Comparison from '../../components/Comparison';
import { AppContext } from '../context';

interface ComparisonData {
  _id?: string;
  major: string;
  college1: string;
  college2: string;
};

export default function ComparisonsPage() {
  const [currentUser, setCurrentUser] = useState('');
  const [comparisons, setComparisons] = useState<ComparisonData[]>([]);
  const [newComparisons, setNewComparisons] = useState([
    { major: '', college1: '', college2: '' ,user:""}
  ]);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState('');
  const appSettings = useContext(AppContext);

  useEffect(() => {
    setMounted(true);
    setCurrentUser(appSettings.getCookie("username")  || 'User');
    fetchComparisons();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);


  
  const fetchComparisons = async () => {
    const res = await fetch('/api/comparison');
    const data = await res.json();
    let temp:any[] = []

    data.comparisons.forEach((item:any) => {
      if(appSettings.getCookie("username") === item.user){
        temp.push(item);
      }
    })


    console.log(temp)
    setComparisons(temp);
    setNewComparisons(temp);
  };
  if (!mounted) return null;

  // Allows typing in textboxes
  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...newComparisons];
    updated[index][field as keyof typeof updated[0]] = value;
    console.log(updated);
    setNewComparisons(updated);
  };

  // Adds new comparison
  const addComparison = (major: string, college1: string, college2: string) => {
    setNewComparisons([...newComparisons, {major, college1, college2,user:currentUser}])
    console.log(newComparisons)
  }

  // Deletes comparison
  const handleDelete = async (index: number) => {
    console.log(comparisons)

    
    const item = comparisons[index];
    if (!item._id) {
      setToast('This item has no ID and cannot be deleted.');
      return;
    }
    try {
      const payload = {
        id:item._id
      }
      const res = await fetch(`/api/comparison/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(payload)
      });
      const updated = comparisons.filter((_, i) => i !== index);
      setComparisons(updated);
      if (res.ok) {
        setToast('Comparison deleted.');
        fetchComparisons();
      } else {
        setToast('Failed to delete comparison.');
      }
    } catch (error) {
      console.error('Error deleting comparison:', error);
      setToast('Error deleting comparison.');
    }
  };

  // Submits a new comparison
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await Promise.all(newComparisons.map(async (comp) => {
        const payload = {
          major: comp.major,
          college1: comp.college1,
          college2: comp.college2,
          user: currentUser
        };

        
        if(!comparisons.includes(comp)){
          const response = await fetch('/api/comparison', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const result = await response.json();
          setToast('Successfully saved.');
          return { ok: response.ok, result };
        }       
        return { ok: "Already exists" };
      }));

      const failed = results.filter(r => !r.ok);
      if (failed.length > 0) {
        console.error('Some submissions failed:', failed);
        setToast('Failed to saved comparison(s).');
      } else {
        setToast('Comparisons synced successfully!');
      }
      fetchComparisons();
    } catch (error) {
      console.error('Error saving comparisons:', error);
      setToast('An error occurred during saving.');
    }
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
            <Link href="/" onClick={() => {
              localStorage.setItem('isLoggedIn', 'false');
              localStorage.setItem('username', '');
            }} className="text-black hover:underline">Log Out</Link>
            <Link href="/" onClick={() => {              
            }} className="text-black hover:underline">Log In</Link>
          </nav>
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <div className="comparison-page">
          {newComparisons.map((item, index) => (
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
          }}onClick={() => {
            addComparison("","","")
          }}>
            Click here to add a new comparison
          </button>
          <button style={{
            border: '1px solid',
            backgroundColor: 'Gainsboro',
            marginLeft: '25px',
            marginTop: '15px',
            paddingLeft: '5px',
            paddingRight: '5px'
          }}
          onClick={handleSubmit}>
            Save Comparisons
          </button>
        </div>
      </div>
    </div>
  );
}