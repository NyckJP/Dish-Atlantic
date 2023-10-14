import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const RestaurantTile = ({ name, location, image_url, id, is_closed, city, user, setShouldRedirect }) => {
    const [favorited, setFavorited] = useState(false)
    const [savedForLater, setSavedForLater] = useState(false)
    const [reviewCount, setReviewCount] = useState(0)
    
    const getSavedIds = async () => {
        try {
            const response = await fetch("/api/v1/savedIds/ids")
            const parsedResponse = await response.json()
            parsedResponse.savedIds.forEach(element => {
                if(element.restaurantId === id) {
                    if(element.savedAs === "FAVORITE") {
                        setFavorited(true)
                    } else {
                        setSavedForLater(true)
                    }
                }
            })
        } catch (error) {
            console.error(`Error in favorite fetch: ${error.message}`)
        }
    }
    
    const getReviewCount = async () => {
        try {
            const response = await fetch(`/api/v1/reviews/${id}/reviewCount`)
            const parsedResponse = await response.json()
            setReviewCount(parsedResponse.reviewCount)
        } catch (error) {
            console.error(`Error in review count fetch: ${error.message}`)
        }
    }
    
    const saveId = async ( saveAs ) => {
        try {
            const response = await fetch("/api/v1/savedIds", {
                method: "post",
                headers: new Headers({ 'Content-type': 'application/json'}),
                body: JSON.stringify({ restaurantId: id, savedAs: saveAs })
            })
        } catch (error) {
            console.error(`Error in favorite fetch: ${error.message}`)
        }
    }
    
    useEffect(() => {
        getSavedIds()
        getReviewCount()
    }, [])

    const handleFavoriteClick = () => {
        if(!user && setShouldRedirect) {
            setShouldRedirect(true)
        } else {
            saveId("FAVORITE")
            setFavorited(!favorited)
        }
    }
    const handleTryLaterClick = () => {
        if(!user && setShouldRedirect) {
            setShouldRedirect(true)
        } else {
            saveId("TRY LATER")
            setSavedForLater(!savedForLater)
        }
    }
    
    let openStatus
    if(is_closed != null){
        if (!is_closed) {
            openStatus = 'Currently Open'
        } else {
            openStatus = 'Currently Closed'
        }
    }

    let favoriteButton
    let tryLaterButton
    if(favorited) {
        favoriteButton = <div className="save-buttons" onClick={handleFavoriteClick}><i className="fa-solid fa-star" style={{color: "#ffd500",}}/> Favorited</div>
    } else {
        favoriteButton = <div className="save-buttons" onClick={handleFavoriteClick}><i className="fa-regular fa-star" /> Favorite</div>
    }
    if(savedForLater) {
        tryLaterButton = <div className="save-buttons" onClick={handleTryLaterClick}><i className="fa-solid fa-clock" style={{color: "#7a00cc",}}/> Saved for Later</div>
    } else {
        tryLaterButton = <div className="save-buttons" onClick={handleTryLaterClick}><i className="fa-regular fa-clock" /> Try Later</div>
    }

    return (
        <div className="callout restaurant-tile">
            <div className="tile-content">
                <a href={`/restaurants/${id}`}>
                    <img src={image_url} className="tile-image"/>
                </a>
                <div className="restaurant-info">
                    <div className="tile-restaurant-name">{name}</div>
                    <div>{location.address1}</div>
                    <div>{city}{openStatus}</div>
                    <div className="save-options">
                        {favoriteButton}
                        {tryLaterButton}
                        <a href={`/restaurants/${id}`}>
                            <i className="fa-solid fa-comment" style={{color: "#a8a8a8",}}/> {reviewCount} reviews
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantTile