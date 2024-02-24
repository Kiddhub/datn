import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import SignIn from '../Auth/SignIn'
import SignUp from '../Auth/SignUp'
import Routess from './Routess'
const Index = () => {
  return (
    <>
        <Box>
          <Routes>
            <Route path='/login' element={<SignIn/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/*' element={<Routess />} />
          </Routes>
        </Box>
    </>

  )
}

export default Index