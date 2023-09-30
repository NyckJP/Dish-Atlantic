import React, { useEffect, useState } from "react"
import RestaurantTile from "./RestaurantTile.js"
import SearchCityForm from "./SearchCityForm.js"

const RestaurantList = (props) => {
    const [restaurants, setRestaurants] = useState([])

    const getRestaurants = async () => {
        try {
            const response = await fetch(`/api/v1/restaurants/${props.city.name}`)
            const parsedResponse = await response.json()
            setRestaurants(parsedResponse.businesses)
        } catch (error) {
            console.error(`Error in List Fetch: ${error}`)
        }
    }

    useEffect(() => {
        getRestaurants()
    }, [props.city])
    
    const restaurantList = restaurants.map(business => {
        return (
            <RestaurantTile key={business.id} {...business}/>
        )
    })
        
    return (
        <div className="grid-container page-height">
            <div className="grid-margin-y grid-x grid-margin-x center-items">
                <SearchCityForm setCity={props.setCity} />
                <div className="cell">
                    <h2 className="text-center list-title">Restaurants Found</h2>
                    <h4 className="text-center">({props.city.name})</h4>
                </div>
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