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

    const restaurantList = restaurants.map(business => {
        return (
            <RestaurantTile key={business.id} {...business}/>
        )
    })

    return (
        <>
            <SearchCityForm setCity={setCity} />
            <h2>Popular Restaurants in {city.name}</h2>
            <ul>{restaurantList}</ul>
        </>
    )
}

export default RestaurantList