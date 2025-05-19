// frontend/app/users/page.tsx
'use client';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import UsersList from '../../components/UsersList';

interface DecodedToken {
  userId: string;
}

export default function UsersPage() {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.userId) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  if (!isClient) return null;
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-sm">Please log in to view all users.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">All Users</h1>
        <UsersList />
      </div>
    </div>
  );
}