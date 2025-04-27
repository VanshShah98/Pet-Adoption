import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check if we are running in the browser
  if (typeof window === 'undefined') return null;

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
