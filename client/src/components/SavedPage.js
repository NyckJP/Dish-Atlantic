import React, { useEffect, useState } from "react"
import RestaurantTile from "./RestaurantTile.js"

const SavedPage = () => {
    const [favorites, setFavorites] = useState([])
    const [tryLaters, setTryLaters] = useState([])

    const getSavedRestaurants = async () => {
        try {
            const response = await fetch("/api/v1/savedIds/restaurants")
            const parsedResponse = await response.json()
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
                city={favorite.city}
            />
        )
    })
    const tryLatersList = tryLaters.map(tryLater => {
        return (
            <RestaurantTile 
                key={tryLater.id} 
                name={tryLater.name}
                location={{ address1: tryLater.address }}
                image_url={tryLater.imageUrl}
                id={tryLater.restaurantId}
                city={tryLater.city}
            />
        )
    })
    
    return (
        <div className="saved-page">
            <div className="half-saved-page">
                <h2><i className="fa-solid fa-star" style={{color: "#ffd500",}}/> Favorited</h2>
                {favoritesList}
            </div>
            <div className="half-saved-page">
                <h2><i className="fa-solid fa-clock" style={{color: "#7a00cc",}}/> Saved For Later</h2>
                {tryLatersList}
            </div>
        </div>
    )
}

export default SavedPage