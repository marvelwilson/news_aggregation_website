import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef, useEffect} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import { useState } from "react";
import Scrapper from "../scrapper.js";


export default function Login() {
  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)
  const [loading, SetLoading] = useState(false)
  
 

  const onSubmit = ev => {
    ev.preventDefault()
    SetLoading(!loading)

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
        SetLoading(false)

      })
      .catch((err) => {
        const response = err.response;
        SetLoading(false)

        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={loading?(e) => e.preventDefault():onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }

          <input ref={emailRef} type="email" placeholder="Email"/>
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <button className="btn btn-block"> {loading?'Processing....':'Login'}</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}
