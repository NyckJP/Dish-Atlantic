import React from "react"

const RestaurantTile = ({ name, location, display_phone, image_url, id }) => {
    //info card forEach restaurant based styling
    //ADD RESTAURANT FOOD CATEGORIES
    //Later, favorite functionality
    return (
        <a href={`/restaurants/${id}`} className="callout secondary restaurant-tile">
            <div className="restaurant-info"><img src={image_url} /></div>
            {name}<br/>
            {location.address1}<br/>
            {display_phone}
        </a>
    )
}

export default RestaurantTile