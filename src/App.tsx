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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <Suspense><EventsPage/></Suspense>
          } />
          <Route path="/events" element={
            <Suspense><EventsPage/></Suspense>
          } />
          <Route path="/tests" element={
            <Suspense><TestsPage/></Suspense>
          }/>
          <Route path="*" element={
            <Suspense><NotFoundPage/></Suspense>
          }/>
        </Route>
      </Routes>
    </ContextProvider>
  )
}

export default App
