import React from 'react'
import Login from './Login/Login'
import Page from './Page/Page'
import { Route, Routes } from 'react-router-dom'

const index = () => {
  return (
    <>
    <Routes>
      <Route path='/*' element={<Page/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default index