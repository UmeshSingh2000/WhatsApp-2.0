
import { Toaster } from 'react-hot-toast'
import Lander from './Pages/Lander'
import { Route, Routes } from 'react-router-dom'
import Chat from './Pages/Chat'

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Lander />} />

        <Route path='/chat' element={<Chat />} />
      </Routes>
    </>
  )
}

export default App
