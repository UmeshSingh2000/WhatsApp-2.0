import { Toaster } from 'react-hot-toast'
import Lander from './Pages/Lander'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Chat from './Pages/Chat'
import PrivateRoute from './Components/PrivateRoute'
import { useEffect } from 'react'
import { checkAuth } from './Redux/Features/authSlice'
import { useDispatch } from 'react-redux'

const fulfilled = "auth/checkAuth/fulfilled"
const App = () => {

  //uncomment this for authentication

  // const dispatch = useDispatch();
  // const navigate = useNavigate()
  // useEffect(() => {
  //   (
  //     async () => {
  //       const response = await dispatch(checkAuth());
  //       if (response.type === fulfilled) {
  //         navigate('/chat', { replace: true })
  //       }
  //     }
  //   )()
  // }, [])
  
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false} />
      <Routes>
        {/* <Route path="/" element={<Lander />} /> */}
        <Route path="/" element={<Chat />} />
        {/* <Route element={<PrivateRoute />}>
          <Route path='/chat' element={<Chat />} />
        </Route> */}
      </Routes>
    </>
  )
}

export default App
