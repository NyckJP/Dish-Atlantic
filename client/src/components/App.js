import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import LandingPage from "./LandingPage";
import RestaurantList from "./RestaurantList.js";
import RestaurantShowPage from "./RestaurantShowPage.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [city, setCity] = useState({ name: "Boston" })
  
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
      <Route 
          exact path="/" 
          render={() => <LandingPage setCity={setCity}/>} 
        />
        <Route 
          exact path="/restaurants" 
          render={() => <RestaurantList city={city} setCity={setCity}/>} 
        />
        <Route 
          exact path="/restaurants/:id"  
          render={props => <RestaurantShowPage {...props} user={currentUser} />} 
        />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default hot(App);
