import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login'
import Departments from './Components/Departments'
import PrivateRoute from './Components/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/departments" element={<PrivateRoute />}>
          <Route path="" element={<Departments/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App