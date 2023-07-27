import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import SearchCityForm from './SearchCityForm.js'

const LandingPage = (props) => {
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const signUp = () => {
        location.href = "/users/new"
    }
    
    const signIn = () => {
        location.href = "/user-sessions/new"
    }

    if(shouldRedirect) {
        return <Redirect push to= "/restaurants" />
    }

    let personalGreeting
    let logInOptions
    if(!props.user) {
        logInOptions = 
            (
                <>
                    <h3 className="cell">Log in to add reviews of your own!</h3>
                    <div className="cell log-in-options">
                        <button className="button" onClick={signUp}>Sign Up</button>
                        <button className="button" onClick={signIn}>Sign In</button>
                    </div>
                </>
            )
    } else {
        personalGreeting = <h3 className="cell">Welcome, {props.user.userName}!</h3>
    }
    
    return (
        <div className="grid-container text-center">
            <div className="grid-x grid-margin-x center-items">
                <h2 className="title cell">App Name</h2>
                {personalGreeting}
                <h3 className="cell">Find restaurants with dishes you may like to try!</h3>
                <a href="/restaurants" className="cell">Find Places in Boston</a>
                <SearchCityForm setCity={props.setCity} setShouldRedirect={setShouldRedirect}/>
                {logInOptions}
            </div>
        </div>
    )
}

export default LandingPage