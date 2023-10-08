import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import RestaurantTile from "./RestaurantTile.js"
import SearchCityForm from "./SearchCityForm.js"

const RestaurantList = (props) => {
    const [restaurants, setRestaurants] = useState([])
    const [title, setTitle] = useState(<></>)
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const getRestaurants = async () => {
        if(props.city.name === 'Invalid Input') {
            setRestaurants([])
            setTitle(
                <div className="cell">
                    <h2 className="text-center list-title red-font">Invalid Search</h2>
                    <h4 className="text-center red-font">Please Try Again</h4>
                </div>
            )
        } else {
            try {
                const response = await fetch(`/api/v1/restaurants/${props.city.name}`)
                if(!response.ok) {
                    if(response.status === 400) {
                        props.setCity({name: 'Invalid Input'})
                        throw new Error('Bad Request to YelpClient')
                    }
                }
                const parsedResponse = await response.json()
                setRestaurants(parsedResponse.businesses)
                setTitle(
                    <div className="cell">
                        <h2 className="text-center list-title">Restaurants Found</h2>
                        <h4 className="text-center">({props.city.name})</h4>
                    </div>
                )
            } catch (error) {
                console.error(`Error in List Fetch: ${error}`)
            }
        }
    }

    useEffect(() => {
        getRestaurants()
    }, [props.city])
    
    const restaurantList = restaurants.map(business => {
        return (
            <RestaurantTile key={business.id} {...business} user={props.user} setShouldRedirect={setShouldRedirect} />
        )
    })

    if(shouldRedirect) {
        return <Redirect push to="user-sessions/new" />
    }

    return (
        <div className="grid-container page-height">
            <div className="grid-x grid-margin-x center-items">
                <SearchCityForm setCity={props.setCity} />
                {title}
                <div className="grid-container">
                    <div className="grid-x center-items">
                        <ul className="cell medium-12">
                            {restaurantList}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantList