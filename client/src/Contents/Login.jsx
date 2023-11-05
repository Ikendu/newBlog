import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState(``)
  const [password, setPassword] = useState(``)
  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch('http://localhost:4000/login', {
      method: `Post`,
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
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
