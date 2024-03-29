import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm.js"
import SignInForm from "./authentication/SignInForm.js"
import TopBar from "./layout/TopBar.js"
import Footer from "./layout/Footer.js"
import LandingPage from "./LandingPage.js"
import RestaurantList from "./RestaurantList.js"
import RestaurantShowPage from "./RestaurantShowPage.js"
import SavedPage from "./SavedPage.js"
import AboutMePage from "./AboutMePage.js"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [city, setCity] = useState({ name: "New York" })
  
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
          render={() => <LandingPage setCity={setCity} user={currentUser} />} 
        />
        <Route 
          exact path="/restaurants" 
          render={() => <RestaurantList city={city} setCity={setCity} user={currentUser}/>} 
        />
        <Route 
          exact path="/restaurants/:id"  
          render={props => <RestaurantShowPage {...props} user={currentUser} />} 
        />
        <Route 
          exact path="/saved" 
          render={() => <SavedPage user={currentUser} />}
        />
        <Route exact path="/about" component={AboutMePage} />
        <Route 
          exact path="/users/new" 
          render={() => <RegistrationForm user={currentUser} />} 
        />
        <Route 
          exact path="/user-sessions/new" 
          render={() => <SignInForm user={currentUser} />}
        />
      </Switch>
      <Footer />
    </Router>
  )
}

export default hot(App)
