import HomePage from '@/components/elements/landing/Landing.tsx';
import './App.css'
import { Route, Routes } from 'react-router';
import { Signup } from './components/elements/authentication/Signup';
import { Login } from './components/elements/authentication/Login';
  function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />

    </Routes>
  )
}

export default App
