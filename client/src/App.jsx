import './App.css'
import Layout from './Contents/Layout'
import Login from './Contents/Login'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Contents/SignUp'
import IndexPage from './Contents/IndexPage'
import UserContextProvider from './userContext'
import CreatePost from './Contents/CreatePost'
import PostPage from './Contents/PostPage'
import EditPost from './Contents/EditPost'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={`/login`} element={<Login />} />
          <Route path={'/register'} element={<SignUp />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
