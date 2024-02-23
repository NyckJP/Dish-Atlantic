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

    if (shouldRedirect) {
        return <Redirect push to= "/restaurants" />
    }

    let personalGreeting
    let logInOptions
    if (!props.user) {
        logInOptions = 
            (
                <div className="cell center-items log-in-options">
                    <h3>When you're signed in, you can</h3>
                    <ul>
                        <li>Save restaurants as favorites and to try later</li>
                        <li>Leave reviews on dishes you've tried</li>
                        <li>Upvote reviews you find helpful</li>
                    </ul>
                    <div className="cell">
                        <button className="button" onClick={signUp}>Sign Up</button>
                        <button className="button" onClick={signIn}>Sign In</button>
                    </div>
                </div>
            )
    } else {
        personalGreeting = <h3 className="personal-greeting">Welcome, {props.user.userName}</h3>
    }
    
    return (
        <div className="page-height">
            <img className="background-photo" src={photo} />
            <div className="grid-container text-center center-items">
                <h2 className="title">Dish Atlantic</h2>
                <div className="greeting">
                    {personalGreeting}
                    <h3>Explore local restaurants and discover new dishes you may like to try!</h3>
                    <a href="/restaurants">Find Places in New York <i className="fa-solid fa-arrow-right" /></a>
                </div>
                <SearchCityForm setCity={props.setCity} setShouldRedirect={setShouldRedirect}/>
                {logInOptions}
            </div>
        </div>
    )
}

export default LandingPage