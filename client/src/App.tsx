import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Departments from './Components/Departments'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/departments" element={<Departments/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App