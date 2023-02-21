import React from "react"

const RestaurantTile = ({ name, location, display_phone, image_url, id }) => {
    //info card forEach restaurant based styling
    //ADD RESTAURANT FOOD CATEGORIES
    //Later, favorite functionality
    return (
        <a href={`/restaurants/${id}`} className="callout restaurant-tile">
            <div className="tile-content grid-x ">
                <div className="section restaurant-img">
                    <img src={image_url} />
                </div>
                <div className="section restaurant-info">
                    {name}<br/>
                    {location.address1}<br/>
                    {display_phone}
                </div>
                <div className="section restaurant-status">
                    Status Placeholder
                </div>
            </div>
        </a>
    )
}

export default RestaurantTile