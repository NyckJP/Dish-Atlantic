import React, { useEffect, useState } from "react"
import RestaurantTile from "./RestaurantTile"

const SavedPage = () => {
    const [favorites, setFavorites] = useState([])
    const [tryLaters, setTryLaters] = useState([])

    const getSavedRestaurants = async () => {
        try {
            const response = await fetch("/api/v1/savedIds")
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            setFavorites(parsedResponse.favorites)
            setTryLaters(parsedResponse.tryLaters)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getSavedRestaurants()
    }, [])

    const favoritesList = favorites.map(favorite => {
        return (
            <RestaurantTile 
                key={favorite.id} 
                name={favorite.name}
                location={{ address1: favorite.address }}
                image_url={favorite.imageUrl}
                id={favorite.restaurantId}
                is_closed={!favorite.isOpen}
            />
        )
    })
    const tryLatersList = tryLaters.map(favorite => {
        return (
            <RestaurantTile 
                key={favorite.id} 
                name={favorite.name}
                location={{ address1: favorite.address }}
                image_url={favorite.imageUrl}
                id={favorite.restaurantId}
                is_closed={!favorite.isOpen}
            />
        )
    })
    
    return (
        <>
            <h2>Favorites</h2>
            {favoritesList}
            <h2>Try Later</h2>
            {tryLatersList}
        </>
    )
}

export default SavedPage