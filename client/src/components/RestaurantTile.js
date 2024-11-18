import React, { useState, useEffect } from "react"
import SaveButtons from "./SaveButtons.js"

const RestaurantTile = ({ name, location, image_url, id, user, setShouldRedirect }) => {
    const [reviewCount, setReviewCount] = useState(0)
    
    const getReviewCount = async () => {
        try {
            const response = await fetch(`/api/v1/reviews/${id}/reviewCount`)
            const parsedResponse = await response.json()
            setReviewCount(parsedResponse.reviewCount)
        } catch (error) {
            console.error(`Error in review count fetch: ${error.message}`)
        }
    }
    
    useEffect(() => {
        getReviewCount()
    }, [])

    let reviewCountMessage = `${reviewCount} reviews`
    if (reviewCount === 1) {
        reviewCountMessage = "1 review"
    }

    return (
        <div className="callout restaurant-tile">
            <div className="tile-content">
                 <a href={`/restaurants/${id}`} className="tile-image"> 
                    <img src={image_url} className="tile-image"/>
                </a>
                <div className="restaurant-info">
                    <div className="restaurant-name">{name}</div>
                    <div>{location.display_address[0]}</div>
                    <div>{location.display_address[location.display_address.length - 1]}</div>
                    <div className="save-options">
                        <SaveButtons restaurantId={id} setShouldRedirect={setShouldRedirect} user={user}/>
                        <a href={`/restaurants/${id}`}>
                            <i className="fa-solid fa-comment" style={{color: "#a8a8a8",}}/> {reviewCountMessage}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantTile