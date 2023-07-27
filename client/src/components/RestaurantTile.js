import React from "react"

const RestaurantTile = ({ name, location, display_phone, image_url, id }) => {
    //add categories filter
    //instead of phone number, have # of comments, favorite functionality, and whether its open

    return (
        <a href={`/restaurants/${id}`} className="callout restaurant-tile">
            <div className="tile-content grid-x ">
                <div className="section restaurant-img">
                    <img src={image_url} />
                </div>
                <div className="section restaurant-info">
                    {name}<br/>
                    {location.address1}<br/>
                     {display_phone}{/*DO NOT NEED NUMBER HERE */}
                </div>
                {/* <div className="section restaurant-status">
                    Status Placeholder
                </div> */}
            </div>
        </a>
    )
}

export default RestaurantTile