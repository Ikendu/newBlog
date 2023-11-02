import './App.css'
import Layout from './Contents/Layout'
import Login from './Contents/Login'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Contents/SignUp'
import IndexPage from './Contents/IndexPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={'/register'} element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default App
