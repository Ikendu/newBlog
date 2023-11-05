import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../userContext'

const Header = () => {
  //const [username, setUsername] = useState(``)
  const { userInfo, setUserInfo } = useContext(UserContext)

  useEffect(() => {
    fetch(`http://localhost:4000/profile`, {
      credentials: `include`,
    }).then((resp) => {
      resp.json().then((userInfo) => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  const logout = () => {
    fetch(`http://localhost:4000/logout`, {
      credentials: `include`,
      method: `POST`,
    })
    setUserInfo(null)
  }
  const username = userInfo?.email

  return (
    <header>
      <Link to={'/'} className='logo'>
        MyBlog
      </Link>

      <nav>
        {username ? (
          <>
            <Link to={`/create`}>Create New Post</Link>
            <a href='' onClick={logout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
export default Header
