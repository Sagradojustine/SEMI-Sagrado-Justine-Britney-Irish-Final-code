"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/LandingPage"
import StudentsPage from "./pages/StudentsPage"
import SubjectsPage from "./pages/SubjectsPage"
import GradesPage from "./pages/GradesPage"
import "./App.css"

function App() {
  const [isInitialized, setIsInitialized] = useState(true)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/grades" element={<GradesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
