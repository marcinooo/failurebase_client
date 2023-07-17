import React from 'react'
import { Outlet } from 'react-router-dom'
import { useMainContext } from '../../store/MainStore'
import Navbar from '../../components/Navbar/Navbar'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import './Layout.css'

const Layout: React.FC = () => {
  const { loading } = useMainContext()

  return (
    <>
      {loading && <ProgressBar/>}
      <Navbar/>
      <div className="page-content">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
