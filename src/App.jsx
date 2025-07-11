

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

import UpdateProfilePage from './pages/UpdateProfilePage'

//aqui restricciones

import IsPrivate from './components/isPrivate'
import IsAdmin from './components/isAdmin'
import IsAnon from './components/isAnon'


function App() {
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>
        <Route exact path="/signup" element={<IsAnon><SignUpPage /></IsAnon>}/>


        <Route exact path="/exercises" element={<ExerciseListPage />}/>
        <Route exact path="/exercises/addExercise" element={<IsAdmin><AddExercisePage /></IsAdmin>}/>
        <Route exact path="/exercises/:exerciseId" element = {<IsPrivate><ExerciseDetailsPage /></IsPrivate>} />
        <Route exact path="/exercises/update/:exerciseId" element = {<IsAdmin><UpdateExercisePage /></IsAdmin>} />


        <Route exact path="/:id/routines" element={<IsPrivate><RoutinesPage /></IsPrivate>}/>
        <Route exact path="/:id/routines/create" element={<IsPrivate><CreateRoutine /></IsPrivate>}/>
        <Route exact path="/routines/:routineId" element={<IsPrivate><RoutineDetailsPage /></IsPrivate>}/>
        <Route exact path="/routines/:routineId/update" element={<IsPrivate><UpdateRoutinePage /></IsPrivate>} />

        <Route exact path="/user" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route exact path="/user/edit" element={<IsPrivate><UpdateProfilePage /></IsPrivate>} />
        

      </Routes>
     
    </div>
  )
}

export default App
