'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AppContext } from '../context';

interface Review {
  _id?: string;
  owner: string;
  title: string;
  description: string;
  rating: number;
}

export default function ReviewsPage() {
  const [currentUser, setCurrentUser] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    owner: '',
    title: 'University Name',
    description: '',
    rating: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState('');

  const [selectedCollege, setSelectedCollege] = useState<string>('');

  const appSettings = useContext(AppContext);

  useEffect(() => {
    console.log(appSettings.listOfColleges);
  },[])

  useEffect(() => {
    setMounted(true);
    setCurrentUser(appSettings.getCookie("username") || 'User');
    fetchReviews();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchReviews = async () => {
    const res = await fetch('/api/items');
    const data = await res.json();
    setReviews(data.items);
  };


  const handleCollegeChange = () => {

  }
  if (!mounted) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (value: number) => {
    setNewReview((prev) => ({ ...prev, rating: value }));
  };

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') return '?';
    const words = name.trim().split(' ');
    return words.slice(0, 2).map(word => word[0].toUpperCase()).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert('Please select a star rating before submitting.');
      return;
    }

    const payload = {
      owner: currentUser,
      title: selectedCollege,
      description: newReview.description,
      rating: newReview.rating,
    };
    console.log(payload)

    try {
      if (editingId) {
        const response = await fetch(`/api/items/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          setToast('Review updated!');
          await fetchReviews();
        } else {
          setToast('Failed to update review.');
        }
      } else {
        const response = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          setToast('Review posted!');
          await fetchReviews();
        } else {
          setToast('Failed to post review.');
        }
      }
    } catch {
      setToast('Something went wrong.');
    }

    setEditingId(null);
    setNewReview({ owner: currentUser, title: 'University Name', description: '', rating: 0 });
  };

  const handleEdit = (review: Review) => {
    setNewReview({
      owner: review.owner,
      title: review.title,
      description: review.description,
      rating: review.rating,
    });
    setEditingId(review._id || null);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    await fetchReviews();
    setToast('Review deleted.');
  };

  const userReview = reviews.find((r) => r.owner === currentUser && r.title === selectedCollege);
  const otherReviews = reviews.filter((r) => r.owner !== currentUser && r.title === selectedCollege);
  const averageRating = reviews.length > 0 ? Math.round(reviews.reduce((sum, r) => {
    if(r.title === selectedCollege){
      return sum + r.rating
    }
    return sum + 0;
  }, 0) / reviews.reduce((sum,r) => {
    if(r.title === selectedCollege){
      return sum + 1;
    }
    return sum + 0;
  }, 0)) : 5;

  return (
    <div className="p-6 w-full bg-[#FAFAF5] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Link href={`/profile/${currentUser}`} className="flex items-center gap-3 hover:opacity-80">
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {getInitials(currentUser)}
            </div>
            <span className="text-xl font-semibold text-black">{currentUser}</span>
          </Link>
          <nav className="flex space-x-10 text-lg font-semibold">
            <Link href="/comparison" className="text-black hover:underline">Comparisons</Link>
            <Link href="/home" className="text-black hover:underline">Home</Link>
            <Link href="/reviews" className="text-red-600 font-bold">Reviews</Link>
            <Link href="/" onClick={() => {
              localStorage.setItem('isLoggedIn', 'false');
              localStorage.setItem('username', '');
              document.cookie = "isLoggedIn=false";
            }} className="text-black hover:underline">Log Out</Link>
            <Link href="/" onClick={() => {              
            }} className="text-black hover:underline">Log In</Link> 
                                  
          </nav>
        </div>
        <hr className="my-4 border-t border-gray-300" />

        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold mb-1">
            <span className="text-yellow-500 text-3xl">{'★'.repeat(averageRating)}</span>
          </h1>
          <select onChange={(e) => {
            setSelectedCollege(e.target.value);
          }}>
            {appSettings.listOfColleges.map((college:any,index) => {
              return <option key={index}>{college.name}</option>
            })}
          </select>
          {/* <p className="text-gray-700 text-lg">{userReview?.title || newReview.title}</p> */}
        </div>

        {toast && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-center">{toast}</div>}

        {!userReview && !editingId && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-8 border bg-white p-4 shadow rounded max-w-xl mx-auto">
            <textarea
              name="description"
              placeholder="Write your review..."
              value={newReview.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <p className="text-sm text-gray-600">Rate from 1 (worst) to 5 (best):</p>
            <div className="flex items-center space-x-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`cursor-pointer text-2xl ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            {newReview.rating === 0 && (
              <p className="text-red-500 text-sm text-center">Please select a rating.</p>
            )}
            <div className="text-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
                Post Review
              </button>
            </div>
          </form>
        )}

        {editingId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold text-center mb-4">{newReview.title}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Description:</label>
                  <textarea
                    name="description"
                    value={newReview.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Rating:</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRating(star)}
                        className={`cursor-pointer text-2xl ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {userReview && (
          <div className="flex justify-between items-start border rounded-lg p-4 shadow mb-6 bg-gray-50">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold">
                {getInitials(userReview.owner)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{userReview.owner}</span>
                  <span className="text-yellow-500 text-sm">{'★'.repeat(userReview.rating)}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{userReview.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleDelete(userReview._id!)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Delete</button>
              <button onClick={() => handleEdit(userReview)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
            </div>
          </div>
        )}

        {otherReviews.length > 0 && (
          <h2 className="text-lg font-semibold mb-2 mt-8">Other Student Reviews</h2>
        )}

        {otherReviews.map((review) => {
          if(review.title === selectedCollege){
            return (
              <div key={review._id} className="flex items-start gap-4 border rounded-lg p-4 shadow mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                {getInitials(review.owner)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">{review.owner}</span>
                  <span className="text-yellow-500 text-sm">{'★'.repeat(review.rating)}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{review.description}</p>
              </div>
            </div>
            )
          }
      })}
      </div>
    </div>
  );
}