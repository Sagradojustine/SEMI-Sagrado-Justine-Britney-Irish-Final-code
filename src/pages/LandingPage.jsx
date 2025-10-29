// pages/LandingPage.jsx
import React from 'react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-fuchsia-200 flex items-start justify-center p-4 pt-24 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-ping"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-fuchsia-300 rounded-full opacity-30 animate-bounce delay-75"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-pink-400 rounded-full opacity-15 animate-pulse delay-150"></div>
      <div className="absolute bottom-40 right-10 w-14 h-14 bg-fuchsia-300 rounded-full opacity-25 animate-ping delay-300"></div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-400 to-fuchsia-400 rounded-full opacity-10 animate-spin-slow"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-tl from-pink-300 to-fuchsia-300 rounded-full opacity-10 animate-float"></div>
      
      {/* Sparkles */}
      <div className="absolute top-1/4 left-1/3 text-4xl animate-bounce-slow">✨</div>
      <div className="absolute bottom-1/4 right-1/3 text-4xl animate-bounce-slow delay-150">✨</div>
      <div className="absolute top-2/3 right-1/4 text-4xl animate-bounce-slow delay-300">✨</div>
      
      {/* Top navbar */}
        <nav className="fixed top-0 left-0 w-full bg-linear-to-r from-pink-500 via-pink-600 to-fuchsia-500 backdrop-blur-sm shadow-xl z-30 border-b-4 border-pink-300">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-white drop-shadow-lg">
              💖 SGMS
            </div>
            <div className="text-sm text-pink-100 font-medium">Student Grade Management</div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/students"
              className="px-4 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Students
            </a>

            <a
              href="/subjects"
              className="px-4 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Subjects
            </a>

            <a
              href="/grades"
              className="px-4 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Grades
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto text-center w-full relative z-10">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="text-4xl animate-bounce">✨</span>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-600 via-fuchsia-600 to-pink-600 text-transparent bg-clip-text drop-shadow-md animate-fade-in">
            Student Grade Management System
          </h1>
          <span className="text-4xl animate-bounce delay-150">✨</span>
        </div>
        
        <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto font-medium animate-fade-in-up drop-shadow-sm">
          A comprehensive platform for managing student information, subjects, and grades with performance analytics and reporting.
                <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-linear-to-br from-pink-400 to-fuchsia-400 rounded-full opacity-10 animate-spin-slow"></div>
                <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-linear-to-tl from-pink-300 to-fuchsia-300 rounded-full opacity-10 animate-float"></div>
        </p>

        {/* Profile card */}
        <div className="bg-gradient-to-br from-white via-pink-50 to-fuchsia-50 rounded-3xl shadow-2xl p-8 mb-8 max-w-md mx-auto border-4 border-pink-400 relative transform hover:scale-105 transition-transform duration-300">
          <div className="absolute -top-4 -right-4 text-5xl">⭐</div>
          <div className="absolute -bottom-4 -left-4 text-5xl">💕</div>
          
          <div className="flex flex-col items-center">
            <div className="relative mb-4 group">
              <img
                src="prof.jpg"
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-pink-500 shadow-xl group-hover:border-fuchsia-500 transition-all duration-300"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full p-2 shadow-lg">
                <span className="text-white text-xl">✨</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-fuchsia-600 text-transparent bg-clip-text mb-1">
              Justine Britney Irish Sagrado
            </h3>
            <p className="text-pink-600 font-bold mb-6 text-lg">BSIT Student 🎓</p>

            <div className="w-full text-left bg-white/70 rounded-2xl p-5 shadow-inner border-2 border-pink-200">
              <h4 className="text-lg font-bold text-pink-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                1–4 Year Journey
              </h4>
              
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3 bg-gradient-to-r from-pink-100 to-pink-50 p-3 rounded-xl border-l-4 border-pink-500 shadow-sm">
                  <span className="font-bold text-pink-600 text-lg shrink-0">1.</span>
                  <div>
                    <span className="font-bold text-pink-700">Year 1:</span> Foundation — onboarding, core coursework, basic data entry and record keeping.
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-gradient-to-r from-green-100 to-green-50 p-3 rounded-xl border-l-4 border-green-500 shadow-sm">
                  <span className="font-bold text-green-600 text-lg shrink-0">2.</span>
                  <div>
                    <span className="font-bold text-green-700">Year 2:</span> Development — deeper subject knowledge, reporting, and grade calculation workflows.
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-gradient-to-r from-yellow-100 to-yellow-50 p-3 rounded-xl border-l-4 border-yellow-500 shadow-sm">
                  <span className="font-bold text-yellow-600 text-lg shrink-0">3.</span>
                  <div>
                    <span className="font-bold text-yellow-700">Year 3:</span> Optimization — analytics, performance insights, and improved instructor/student workflows.
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-gradient-to-r from-fuchsia-100 to-fuchsia-50 p-3 rounded-xl border-l-4 border-fuchsia-500 shadow-sm">
                  <span className="font-bold text-fuchsia-600 text-lg shrink-0">4.</span>
                  <div>
                    <span className="font-bold text-fuchsia-700">Year 4:</span> Leadership — advanced reporting, data-driven decisions, and system administration.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Features card */}
        <div className="bg-gradient-to-br from-white via-pink-50 to-fuchsia-50 rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border-4 border-fuchsia-400 transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-fuchsia-600 text-transparent bg-clip-text mb-6 flex items-center justify-center gap-3">
            <span className="text-4xl">💖</span>
            System Features
            <span className="text-4xl">💖</span>
          </h2>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <li className="flex items-center bg-gradient-to-br from-pink-100 to-pink-50 p-4 rounded-2xl shadow-md border-2 border-pink-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
              <span className="text-pink-600 mr-3 text-2xl font-bold">✓</span>
              <span className="text-gray-800 font-semibold">Student Information Management</span>
            </li>
            <li className="flex items-center bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 p-4 rounded-2xl shadow-md border-2 border-fuchsia-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
              <span className="text-fuchsia-600 mr-3 text-2xl font-bold">✓</span>
              <span className="text-gray-800 font-semibold">Subject and Course Management</span>
            </li>
            <li className="flex items-center bg-gradient-to-br from-pink-100 to-pink-50 p-4 rounded-2xl shadow-md border-2 border-pink-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
              <span className="text-pink-600 mr-3 text-2xl font-bold">✓</span>
              <span className="text-gray-800 font-semibold">Grade Recording and Calculation</span>
            </li>
            <li className="flex items-center bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 p-4 rounded-2xl shadow-md border-2 border-fuchsia-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
              <span className="text-fuchsia-600 mr-3 text-2xl font-bold">✓</span>
              <span className="text-gray-800 font-semibold">Performance Analytics</span>
            </li>
            <li className="flex items-center bg-gradient-to-br from-pink-100 to-pink-50 p-4 rounded-2xl shadow-md border-2 border-pink-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
              <span className="text-pink-600 mr-3 text-2xl font-bold">✓</span>
              <span className="text-gray-800 font-semibold">Real-time Data Storage</span>
            </li>
            <li className="flex items-center bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 p-4 rounded-2xl shadow-md border-2 border-fuchsia-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
              <span className="text-fuchsia-600 mr-3 text-2xl font-bold">✓</span>
              <span className="text-gray-800 font-semibold">Responsive Design</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;