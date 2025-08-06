
import Lander from './Components/Lander'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Lander />} />
      </Routes>
    </>
  )
}

export default App
