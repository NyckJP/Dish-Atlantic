import React from "react"

const RestaurantTile = ({ name, location, image_url, id, is_closed }) => {
    let openStatus
    if (!is_closed) {
        openStatus = 'Currently Open'
    } else {
        openStatus = 'Currently Closed'
    }

    return (
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
    )
}

export default RestaurantTile