import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Pet Adoption</div>
        <div>
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 