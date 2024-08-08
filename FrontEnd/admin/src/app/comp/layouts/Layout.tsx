import React from 'react'
import SideBar from '../common/SideBar'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'

export default function layout() {
    
  return (
    <div className='d-flex'>
            <div className='col-2'>
                <SideBar />
            </div>
            <div className='col-10'>
                <Header />
                <Outlet />
            </div>
        </div>
  )
}
