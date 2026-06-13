import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-indigo-600">EnglishLab</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 font-medium transition">
            Dashboard
          </Link>
          <Link to="/lessons" className="text-gray-700 hover:text-indigo-600 font-medium transition">
            Lessons
          </Link>
          <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium transition">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
              {user?.displayName?.charAt(0) || 'U'}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
