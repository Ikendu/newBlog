import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const handleForm = async (e) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (resp.status === 200) alert(`registration successful`);
    else alert(`registration failed`);
  };

  return (
    <div>
      <form className="register" onSubmit={handleForm}>
        <h2 className=" text-blue-700 text-3xl font-bold">Register</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="user name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn bg-blue-500 font-semibold">Register</button>
      </form>
    </div>
  );
};
export default SignUp;
