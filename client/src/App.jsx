import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const Layout = lazy(() => import('./pages/Layout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'))
const Preview = lazy(() => import('./pages/Preview'))
const Login = lazy(() => import('./pages/Login'))

const App = () => {
  return (
    <Suspense fallback={<div className='min-h-screen flex items-center justify-center text-slate-500'>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='app' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>
        <Route path='view/:resumeId' element={<Preview />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </Suspense>
  )
}

export default App
