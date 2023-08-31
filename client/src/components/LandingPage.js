import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import photo from "./../assets/img/silas-baisch-K785Da4A_JA-unsplash.jpg"
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
                    <h3 className="cell log-in-header">
                        When you're signed in, you can
                    </h3>
                    <ul className="log-in-list">
                        <li>Save restaurants as favorites and to try later</li>
                        <li>Leave reviews on dishes you've tried</li>
                        <li>Upvote reviews you find helpful</li>
                    </ul>
                    <div className="cell log-in-options">
                        <button className="button" onClick={signUp}>Sign Up</button>
                        <button className="button" onClick={signIn}>Sign In</button>
                    </div>
                </>
            )
    } else {
        personalGreeting = <h3 className="cell">Welcome, {props.user.userName}</h3>
    }
    
    return (
        <div className="page-height">
            <img className="background-photo" src={photo}></img>
            <div className="grid-container text-center">
                <div className="grid-x grid-margin-x center-items">
                    <h2 className="title cell">Dish Atlantic</h2>
                    <div className="greeting">
                        {personalGreeting}
                        <h3 className="cell">Find restaurants with dishes you may like to try</h3>
                        <a href="/restaurants" className="cell landing-page-link">Find Places in New York <i className="fa-solid fa-arrow-right" /></a>
                    </div>
                    <SearchCityForm setCity={props.setCity} setShouldRedirect={setShouldRedirect}/>
                    {logInOptions}
                </div>
            </div>
        </div>
    )
}

export default LandingPage