import React, { useEffect, useState } from "react"

const RestaurantShowPage = props => {
    const [restaurant, setRestaurant] = useState({})

    const restaurantId = props.match.params.id

    const getRestaurant = async () => {
        try {
            const response = await fetch(`/api/v1/restaurants/show/${restaurantId}`)
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`);
            }
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            setRestaurant(parsedResponse)
        } catch (error) {
            console.log(`Error in showpage fetch: ${error.message}`)
        }
    }
    useEffect(() => {
        getRestaurant()
    }, [])

    //name, image carousel (photos property), rating, transaction types (transaction property), display_phone, categories, location, hours
    //later, users can post thought about SPECIFIC MENU ITEMS
    //later later, a way to add to favorites or try laters
    return (
        <>
            <h1>{restaurant.name}</h1>
            <img src={restaurant.image_url}/>
            <h4>Rating: {restaurant.rating} (of {restaurant.review_count} reviews)</h4>
            <h4>Phone Number: {restaurant.display_phone}</h4>
            {/* <h4>Location: {restaurant.location.address1} - {restaurant.location.city}</h4> */}
        </>
    )
}

export default RestaurantShowPage