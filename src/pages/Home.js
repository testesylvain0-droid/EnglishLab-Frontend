import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">EnglishLab</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn English at your own pace with interactive lessons designed for all levels
          </p>
          <div className="flex gap-4 justify-center flex-col md:flex-row">
            <Link
              to="/register"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/80 backdrop-blur py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose EnglishLab?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Interactive Lessons',
                description: 'Engaging lessons with quizzes, audio, and real-world examples'
              },
              {
                title: 'All Levels',
                description: 'From beginner to advanced, find lessons tailored to your level'
              },
              {
                title: 'Offline Access',
                description: 'Learn anywhere with our Progressive Web App - no internet required'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
