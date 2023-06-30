import {Navigate, Outlet, useNavigate} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../../src/index.css'
import { useEffect } from "react";

export default function GuestLayout() {
  const { user, token } = useStateContext();
  const navigate = useNavigate()
  
  useEffect(()=>{
    if (token) {
      navigate('/')
   }
   }, [token])

  return (
    <div id="guestLayout">
      <Outlet />
    </div>
  );
}
