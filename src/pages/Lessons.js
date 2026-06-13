import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'lessons'));
        setLessons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const filteredLessons = filter === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.level === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">All Lessons</h1>

      {/* Filter */}
      <div className="mb-8 flex gap-2">
        {['all', 'beginner', 'intermediate', 'advanced'].map(level => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === level
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-600'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map(lesson => (
          <Link
            key={lesson.id}
            to={`/lesson/${lesson.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-40 bg-gradient-to-br from-indigo-500 to-blue-600"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full font-semibold capitalize">
                  {lesson.level}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{lesson.duration || '10'} min</span>
                <span className="text-indigo-600 font-semibold">{lesson.points || 10} pts</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
