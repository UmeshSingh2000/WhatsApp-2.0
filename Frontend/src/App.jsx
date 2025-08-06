
import { Toaster } from 'react-hot-toast'
import Lander from './Components/Lander'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Lander />} />
      </Routes>
    </>
  )
}

export default App
