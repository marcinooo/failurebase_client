import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'chota'
import './App.css'

import { ContextProvider } from './store/MainStore'
import Layout from './pages/Layout/Layout'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const EventsPage = lazy(async () => await import('./pages/EventsPage/EventsPage'))

const TestsPage = lazy(async () => await import('./pages/TestsPage/TestsPage'))

const App: React.FC = () => {
  return (
    <ContextProvider>
      <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<EventsPage/>} />
            <Route path="/events" element={
              <Suspense fallback={<div>Loading...</div>}><EventsPage/></Suspense>} />
            <Route path="/tests" element={
              <Suspense fallback={<div>Loading...</div>}><TestsPage/></Suspense>
            }/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Route>
        </Routes>
      </div>
    </ContextProvider>
  )
}

export default App
