import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, isPending, error } = useLogin()

  const handleSubmit = e => {
    e.preventDefault()
    console.log(email, password);
    login(email, password)
    setPassword("")
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input 
          type="email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password:</span>
        <input 
          type="password" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <p className="error">{error}</p>}
      </form>
  );
}

export default Login;
