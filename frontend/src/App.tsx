import HomePage from '@/components/elements/landing/Landing.tsx';
import './App.css'
import { Route, Routes } from 'react-router';
import { Signup } from './components/elements/authentication/Signup';
import { Login } from './components/elements/authentication/Login';
import { Toaster } from '@/components/ui/sonner';
import { AppHome } from './components/elements/app-main/AppHome';
import { GoalMain } from './components/elements/goal/GoalMain';

  function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<AppHome />} />
        <Route path='/app/:goalId' element={<GoalMain />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
