import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

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
  ];

  const authenticatedListItems = [
    <li key="username">
      {user?.userName}
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>
  ];

  return (
    <div className="top-bar">
      <div className="">
        <ul className="menu">
          <li className="menu-text">Dish Atlantic</li>
          <li>
            <Link to="/"><i className="fa-solid fa-house" /> Home</Link>
          </li>
          <li>
            <Link to="/restaurants"><i className="fa-solid fa-utensils" /> Restaurants</Link>
          </li>
          <li>
            <Link to="/saved"><i className="fa-solid fa-clock" /> Saved</Link>
          </li>
          <li>
            <Link to="/about">About Me</Link>
          </li>
        </ul>
      </div>
      <div className="">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
