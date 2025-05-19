// frontend/app/profile/page.tsx
'use client';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import UserProfile from '../../components/UserProfile';

interface DecodedToken {
  userId: string;
}

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure component only renders on client
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  if (!isClient) return null;
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-sm">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Profile</h1>
        <UserProfile userId={userId} />
      </div>
    </div>
  );
}