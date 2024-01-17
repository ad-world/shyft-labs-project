import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Students from './pages/Students'
import Courses from './pages/Courses'
import Results from './pages/Results'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />   
        <Route path="/results" element={<Results/> }/>       
      </Routes>
    </BrowserRouter>
  )
}

export default App
