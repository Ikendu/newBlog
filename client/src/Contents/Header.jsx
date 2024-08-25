import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

const Header = () => {
  //const [username, setUsername] = useState(``)
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:4000/profile`, {
      credentials: `include`,
    }).then((resp) => {
      resp.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch(`http://localhost:4000/logout`, {
      credentials: `include`,
      method: `POST`,
    });
    setUserInfo(null);
  };
  const username = userInfo?.email;

  return (
    <header className="bg-gray-100 p-5">
      <Link to={"/"} className="logo">
        <h1 className="text-4xl text-bold text-blue-600">More-links Blog</h1>
      </Link>

      <nav>
        {username ? (
          <>
            <Link to={`/create`}>Create New Post</Link>
            <a href="" onClick={logout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
