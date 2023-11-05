import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../userContext'

const Login = () => {
  const [email, setEmail] = useState(``)
  const [password, setPassword] = useState(``)
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const resp = await fetch('http://localhost:4000/login', {
      method: `Post`,
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: `include`,
    })
    if (resp.ok) {
      resp.json().then((userInfo) => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
    } else alert(`wrong credentials`)
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <form className='login' onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <input
          type='text'
          placeholder='user name'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn'>Login here</button>
      </form>
    </>
  )
}
export default Login
