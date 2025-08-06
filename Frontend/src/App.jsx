
import Lander from './Components/Lander'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './Components/RegitserPage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Lander />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
