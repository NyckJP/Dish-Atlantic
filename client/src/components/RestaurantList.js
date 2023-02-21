import React, { useEffect, useState } from "react"
import RestaurantTile from "./RestaurantTile.js"
import SearchCityForm from "./searchCityForm.js"

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([])
    const [city, setCity] = useState({ name: "Boston" })

    const getRestaurants = async () => {
        try {
            const response = await fetch(`/api/v1/restaurants/${city.name}`)
            const parsedResponse = await response.json()
            setRestaurants(parsedResponse.businesses)
            console.log(parsedResponse)
        } catch (error) {
            console.log(`Error in List Fetch: ${error}`)
        }
    }

    useEffect(() => {
        getRestaurants()
    }, [city])
    
    //is open, business website (button), favorited
    const restaurantList = restaurants.map(business => {
        return (
            <RestaurantTile key={business.id} {...business}/>
            )
        })
        
    return (
        <>
            <SearchCityForm setCity={setCity} />

            <div className="grid-container">
                <div className="grid-margin-y align-center">
                    <div className="cell">
                        <h2 className="text-center">Popular Restaurants in {city.name}</h2>
                    </div>
                    <div className="grid-conatiner">
                        <div className="grid-x center-items">
                            <ul className="cell medium-9">
                                {restaurantList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantList