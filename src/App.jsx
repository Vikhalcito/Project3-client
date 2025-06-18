

import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'


function App() {
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/login" element={<LoginPage />}/>
      </Routes>
     
    </>
  )
}

export default App
