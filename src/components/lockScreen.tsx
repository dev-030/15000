'use client';


import { useState, useEffect } from 'react';

const CORRECT_PASSWORD = 'edcluster123'; 
const TRUSTED_REFERRER = 'https://learnmore.edcluster.com'; 


export default function LockScreen({ children }: { children: React.ReactNode }) {

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  
  useEffect(() => {
    const isLocalUnlocked = localStorage.getItem('isUnlocked') === 'true';
    const cameFromTrustedSite = document.referrer.startsWith(TRUSTED_REFERRER);
    
    if (isLocalUnlocked || cameFromTrustedSite) {
      localStorage.setItem('isUnlocked', 'true');
      setIsUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem('isUnlocked', 'true');
      setIsUnlocked(true);
    } else {
      setError('Incorrect password');
    }
  };

  if (isUnlocked) return <>{children}</>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-700">🔒 Locked</h1>
        <p className="text-sm text-gray-500">Enter password to unlock the site</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer">
          Unlock
        </button>
      </form>
    </div>
  );
}
