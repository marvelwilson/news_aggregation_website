import { Link, useNavigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPersonCircle } from 'react-icons/bs';
import Scrapper from "../scrapper";

export default function DefaultLayout(args) {
  const { user, token, setUser, setToken } = useStateContext();
   const navigate = useNavigate()

  
  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }
  Scrapper()

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data.user)
      })
      if (!token) {
        navigate('/login')
     }
  }, [token])

  return (
    <div id="defaultLayout">
      
      <div className="fixed bg-white">
        <Navbar {...args} className="container">
          <NavbarBrand href="/"> <b>News</b></NavbarBrand>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link className="links" to="/Home">Home</Link>
            </NavItem>
          </Nav>
          <small>{user.name} &nbsp; &nbsp;</small>
          <UncontrolledDropdown
            className="me-2"
            direction="down"
          >
            <DropdownToggle
              caret
              color="black"
              style={{background:'white'}}
            >
              <BsPersonCircle color="black" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link className="links" to={`/users/${user?.id}`}>
                  Your Profile
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link className="links" to={"/prefernce"}>
                 Preference
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <NavLink onClick={onLogout}>
                  Sign Out
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Navbar>
      </div>
      <div className="content">
        <main>
          <Outlet/>
        </main>
      </div>
    </div>

  )
}
