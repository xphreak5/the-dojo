import "./Signup.css"

import React, { useEffect, useRef, useState } from 'react';
import { useSignup } from "../../hooks/useSignup";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailerror, setThumbnailError] = useState(null)
  const [successText, setSuccessText] = useState("")

  const { signup, error, isPending, success, setSuccess } = useSignup()

  const refSuccess = useRef(setSuccess).current

  const history = useRef(useHistory()).current

  useEffect(() => {
    if (success) {
      setSuccessText("You have successfully created your account, you ll be redirected to homepage...")
      setTimeout(() => {
        setSuccessText("")
        refSuccess(false)
        history.push("/")
      }, 3000)
    }
  }, [success, refSuccess, history])

  const handleSubmit = e => { 
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }


  const handleFileChange = e => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file")
      return
    }
    
    if (!selected.type.includes("image")){
      setThumbnailError("Selected file must be an image")
      return
    }

    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less than 100kb")
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log("thumbnail updated");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
      <label>
        <span>Nickname:</span>
        <input 
          type="text" 
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>Profile Thumbnail:</span>
        <input 
          type="file"
          required
          onChange={handleFileChange}
        />
        {(thumbnailerror || error) && <div className="error">{thumbnailerror || error}</div>}
      </label>
      {!isPending && <button className="btn">Sign Up</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {success && <div className="success">{successText}</div>}
    </form>
  );
}

export default Signup;
