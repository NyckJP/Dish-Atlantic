import React from "react"

const RestaurantTile = ({ name, location, display_phone, image_url }) => {
    return (
        <div className="callout secondary restaurant-tile">
            <div className="restaurant-info"><img src={image_url} /></div>
            {name}<br/>
            {location.address1}<br/>
            {display_phone}
        </div>
    )
}

export default RestaurantTile