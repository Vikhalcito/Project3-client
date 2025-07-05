

import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ExerciseListPage from './pages/ExerciseListPage'
import AddExercisePage from './pages/AddExercisePage'
import ExerciseDetailsPage from './pages/ExerciseDetailPage'
import CreateRoutine from './components/CreateRoutine'
import RoutinesPage from './pages/RoutinesPage'
import RoutineDetailsPage from './pages/RoutineDetailsPage'
import UpdateExercisePage from './pages/UpdateExercisePage'
import ProfilePage from './pages/ProfilePage'
import UpdateRoutinePage from './pages/UpdateRoutinePage'



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
        <Route exact path="/exercises/:exerciseId" element = {<ExerciseDetailsPage />} />
        <Route exact path="/exercises/update/:exerciseId" element = {<UpdateExercisePage />} />


        <Route exact path="/:id/routines" element={<RoutinesPage />}/>
        <Route exact path="/:id/routines/create" element={<CreateRoutine />}/>
        <Route exact path="/routines/:routineId" element={<RoutineDetailsPage />}/>
        <Route exact path="/routines/:routineId/update" element={<UpdateRoutinePage />} />

        <Route exact path="/user" element={<ProfilePage />} />

      </Routes>
     
    </div>
  )
}

export default App
