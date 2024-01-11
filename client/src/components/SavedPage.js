import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import RestaurantTile from "./RestaurantTile.js"

const SavedPage = ({ user }) => {
    const [favorites, setFavorites] = useState([])
    const [tryLaters, setTryLaters] = useState([])

    if (!user) {
        return <Redirect push to= "/users/new" />
    }

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

    let favoritesList = favorites.map(favorite => {
        return (
            <RestaurantTile 
                key={favorite.id} 
                name={favorite.name}
                location={{ display_address: [favorite.address1, favorite.address2] }}
                image_url={favorite.imageUrl}
                id={favorite.restaurantId}
            />
        )
    })
    if (favoritesList.length === 0) {
        favoritesList = (
            <>
                <div>You haven't listed any restaurants as favorites.</div>
                <a href="/restaurants">Browse through some now!</a>
            </>
        )
    }
    
    let tryLatersList = tryLaters.map(tryLater => {
        return (
            <RestaurantTile 
                key={tryLater.id} 
                name={tryLater.name}
                location={{ display_address: [tryLater.address1, tryLater.address2] }}
                image_url={tryLater.imageUrl}
                id={tryLater.restaurantId}
            />
        )
    })
    if (tryLatersList.length === 0) {
        tryLatersList = (
            <>
                <div>You haven't listed any restaurants to try later.</div>
                <a href="/restaurants">Browse through some now!</a>
            </>
        )
    }
    
    return (
        <div className="saved-page page-height">
            <h1 className="text-center list-title">Saved Restaurants</h1>
            <div className="saved-lists">
                <div className="half-saved-page">
                    <h2><i className="fa-solid fa-star" style={{color: "#ffd500",}}/> Favorited</h2>
                    {favoritesList}
                </div>
                <div className="half-saved-page">
                    <h2><i className="fa-solid fa-clock" style={{color: "#7a00cc",}}/> Saved For Later</h2>
                    {tryLatersList}
                </div>
            </div>
        </div>
    )
}

export default SavedPage