

import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ExerciseListPage from './pages/ExerciseListPage'
import AddExercisePage from './pages/AddExercisePage'
import ExerciseDetailsPage from './pages/ExerciseDetailPage'


function App() {
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/login" element={<LoginPage />}/>
        <Route exact path="/signup" element={<SignUpPage />}/>
        <Route exact path="/exercises" element={<ExerciseListPage />}/>
        <Route exact path="/exercises/addExercise" element={<AddExercisePage />}/>
        <Route exact path="/exercises/edit/:exerciseId" element = {<ExerciseDetailsPage />} />
        
      </Routes>
     
    </div>
  )
}

export default App
