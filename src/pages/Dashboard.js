import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

function Dashboard({ user }) {
  const [userData, setUserData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUserData(userDoc.data());

        const lessonsQuery = query(
          collection(db, 'lessons'),
          where('level', '==', userDoc.data()?.level || 'beginner')
        );
        const lessonsSnapshot = await getDocs(lessonsQuery);
        setLessons(lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.uid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, <span className="text-indigo-600">{userData?.name}</span>!
        </h1>
        <p className="text-gray-600">Your current level: <span className="font-semibold capitalize">{userData?.level}</span></p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-4xl font-bold text-indigo-600">{userData?.lessonsCompleted || 0}</div>
          <p className="text-gray-600">Lessons Completed</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-4xl font-bold text-green-600">{userData?.totalPoints || 0}</div>
          <p className="text-gray-600">Total Points</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-4xl font-bold text-purple-600">{lessons.length}</div>
          <p className="text-gray-600">Available Lessons</p>
        </div>
      </div>

      {/* Lessons Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map(lesson => (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-indigo-500 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-sm rounded-full font-semibold">
                    {lesson.type}
                  </span>
                  <span className="text-gray-500 text-sm">{lesson.duration || '10'} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
