import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'lessons', id));
        if (docSnap.exists()) {
          setLesson(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <p className="text-gray-600">Lesson not found</p>
      </div>
    );
  }

  const content = lesson.content || [];
  const isLastStep = currentStep === content.length - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-indigo-100">{lesson.description}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {content[currentStep] && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {content[currentStep].title}
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  {content[currentStep].text}
                </p>

                {/* Display image if available */}
                {content[currentStep].image && (
                  <div className="my-6">
                    <img 
                      src={content[currentStep].image} 
                      alt="lesson" 
                      className="max-w-full rounded-lg"
                    />
                  </div>
                )}

                {/* Quiz question */}
                {content[currentStep].quiz && (
                  <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-4">
                      {content[currentStep].quiz.question}
                    </p>
                    <div className="space-y-3">
                      {content[currentStep].quiz.options.map((option, idx) => (
                        <label key={idx} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-white cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${currentStep}`}
                            value={idx}
                            checked={answers[currentStep] === idx}
                            onChange={() => setAnswers({ ...answers, [currentStep]: idx })}
                            className="mr-3"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{currentStep + 1} / {content.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentStep + 1) / content.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4 justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(content.length - 1, currentStep + 1))}
                  disabled={isLastStep}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLastStep ? 'Completed! 🎉' : 'Next'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonDetail;
