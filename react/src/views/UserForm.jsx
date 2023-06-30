import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [pageLoading, setPageLoading] = useState(false)
  const { setNotification } = useStateContext()

  if (id) {
    useEffect(() => {
      setPageLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setPageLoading(false)
          setUser(data)
        })
        .catch(() => {
          setPageLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      setLoading(true)

      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/')
          setLoading(false)

        })
        .catch(err => {
          setLoading(false)

          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <div className="login-signup-form">
      <div className="card animated fadeInDown container col-lg-5">
        {pageLoading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!pageLoading && (
          <form onSubmit={onSubmit}>
            <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Name" />
            <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Email" />
            <input type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password" />
            <input type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder="Password Confirmation" />
            <button className="btn btn-block">{loading ? 'Processing....' : 'Login'}</button>
          </form>
        )}
      </div>
    </div>
  )
}
