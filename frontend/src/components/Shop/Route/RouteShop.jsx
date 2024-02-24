import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Page from '../pages/Page'
import SignIn from '../AuthShop/SignIn'
import SignUp from '../AuthShop/SignUp'
import CreateShop from '../ShopInfo/CreateShop'
import useRequireAuth from '../AuthShop/RequireAuth'

const RouteShop = () => {
  const token = useRequireAuth();
  return (
    <>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path='/*' element={<Page />} />
        <Route path='/newShop' element={<CreateShop/>}/>
      </Routes>
    </>
  )
}

export default RouteShop