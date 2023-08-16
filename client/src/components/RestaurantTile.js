import React, { useState, useEffect } from "react"

const RestaurantTile = ({ name, location, image_url, id, is_closed, city }) => {
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
        saveId("FAVORITE")
        setFavorited(!favorited)
    }
    const handleTryLaterClick = () => {
        saveId("TRY LATER")
        setSavedForLater(!savedForLater)
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
        favoriteButton = <input className="button" type="button" value="Favorited" onClick={handleFavoriteClick}/>
    } else {
        favoriteButton = <input className="button" type="button" value="Favorite" onClick={handleFavoriteClick}/>
    }
    if(savedForLater) {
        tryLaterButton = <input className="button" type="button" value="Saved for Later" onClick={handleTryLaterClick}/>
    } else {
        tryLaterButton = <input className="button" type="button" value="Try Later" onClick={handleTryLaterClick}/>
    }

    return (
        <>
            <a href={`/restaurants/${id}`} className="callout restaurant-tile">
                <div className="tile-content grid-x ">
                    <div className="section restaurant-img">
                        <img src={image_url} className="tile-image"/>
                    </div>
                    <div className="section restaurant-info">
                        {name}<br/>
                        {location.address1}<br/>
                        {city}
                        {openStatus}
                    </div>
                </div>
            </a>
            {favoriteButton}
            {tryLaterButton}
            {reviewCount} reviews
        </>
    )
}

export default RestaurantTile