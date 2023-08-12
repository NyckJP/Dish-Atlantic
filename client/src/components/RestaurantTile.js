import React from "react"

const RestaurantTile = ({ name, location, image_url, id, is_closed }) => {
    //favorited state thats true/false
    //toggle when post favorite

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

    const handleFavoriteClick = () => {
        saveId("FAVORITE")
    }
    const handleTryLaterClick = () => {
        saveId("TRY LATER")
    }
    
    let openStatus
    if (!is_closed) {
        openStatus = 'Currently Open'
    } else {
        openStatus = 'Currently Closed'
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
                        {openStatus}
                    </div>
                </div>
            </a>
            <input className="button" type="button" value="Favorite" onClick={handleFavoriteClick}/>
            <input className="button" type="button" value="Try Later" onClick={handleTryLaterClick}/>
        </>
    )
}

export default RestaurantTile