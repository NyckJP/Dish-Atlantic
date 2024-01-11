import React from "react"
import { Link } from "react-router-dom"
import { Menu } from "@headlessui/react"
import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ]

  const authenticatedListItems = [
    <li key="username" className="username">
      Signed In as {user?.userName}
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>
  ]

  const menuItems = (
    <Menu.Items className="menu-list">
      <Menu.Item><Link to="/"><i className="fa-solid fa-house" /> Home</Link></Menu.Item>
      <Menu.Item><Link to="/restaurants"><i className="fa-solid fa-utensils" /> Restaurants</Link></Menu.Item>
      <Menu.Item><Link to="/saved"><i className="fa-solid fa-clock" /> Saved</Link></Menu.Item>
      <Menu.Item><Link to="/about"><i className="fa-solid fa-user" /> About Me</Link></Menu.Item>
    </Menu.Items>
  )

  return (
    <div className="top-bar">
      <Menu>
        <ul className="menu">
          <Menu.Button className="menu-button"><i className="fa-solid fa-bars" /></Menu.Button>
          {menuItems}
          <li className="menu-text">Dish Atlantic</li>
          <li className="menu-item">
            <Link to="/"><i className="fa-solid fa-house" /> Home</Link>
          </li>
          <li className="menu-item"> 
            <Link to="/restaurants"><i className="fa-solid fa-utensils" /> Restaurants</Link>
          </li>
          <li className="menu-item">
            <Link to="/saved"><i className="fa-solid fa-clock" /> Saved</Link>
          </li>
          <li className="menu-item">
            <Link to="/about"><i className="fa-solid fa-user" /> About Me</Link>
          </li>
        </ul>
      </Menu>
      <div>
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  )
}

export default TopBar
