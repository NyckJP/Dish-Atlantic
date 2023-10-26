import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ReviewTile from "./ReviewTile.js"
import NewDishReviewForm from "./NewDishReviewForm.js"
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";

const RestaurantShowPage = props => {
    const [restaurant, setRestaurant] = useState({reviews: []})
    const [shouldRenderForm, setShouldRenderForm] = useState(false)
    const [errors, setErrors] = useState([])
    // console.log(restaurant)

    const restaurantId = props.match.params.id

    const getRestaurant = async () => {
        try {
            const response = await fetch(`/api/v1/restaurants/show/${restaurantId}`)
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`);
            }
            const parsedResponse = await response.json()
            setRestaurant(parsedResponse)
        } catch (error) {
            console.error(`Error in showpage fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getRestaurant()
    }, [])

    const postReview = async (payload) => {
        payload.restaurantId = restaurantId
        try {
            const response = await fetch("/api/v1/reviews", {
                method: "post",
                headers: new Headers({
                    'Content-Type': "application/json"
                }),
                body: JSON.stringify(payload)
            })
            if (!response.ok){
                if (response.status === 422) {
                    const parsedResponse = await response.json()
                    const newErrors = translateServerErrors(parsedResponse.errors)
                    return setErrors(newErrors)
                }
                throw new Error(`${response.status} (${response.statusText})`)
            }
            setErrors([])
            const parsedResponse = await response.json()
            const updatedReviews = restaurant.reviews.concat(parsedResponse.review);
            setRestaurant({ ...restaurant, reviews: updatedReviews })
            setShouldRenderForm(false)
        } catch (error) {
            console.error(`Error in post fetch: ${error.message}`)
        }
    }

    const deleteReview = async (reviewId) => {
        try {
            const response = await fetch(`/api/v1/reviews/${reviewId}`, {
                method: "delete",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`);
            }
            setRestaurant({
                ...restaurant,
                reviews: restaurant.reviews.filter(review => review.id !== reviewId),
            })
        } catch (error) {
            console.error(`Error in delete fetch: ${error.message}`)
        }
    }
    
    const handleFormRequest = () => {
        setShouldRenderForm(!shouldRenderForm)
    }

    let transactionTypes
    if(restaurant.transactions) {
        transactionTypes = restaurant.transactions.map(type => {
            if(type === 'restaurant_reservation')
                return "*restaurant reservation "
            return `*${type} `
        })
    }
    
    const reviewList = restaurant.reviews.map(review => {
        return (
            <ReviewTile 
                key={review.id} 
                {...review} 
                deleteReview={deleteReview}
                user={props.user}
                restaurant={restaurant}
                setRestaurant={setRestaurant} 
            />
        )
    })
    
    let form
    if (shouldRenderForm){
        if (props.user){
            form = (
                <>
                    <ErrorList errors={errors} /> 
                    <NewDishReviewForm postReview={postReview} />
                </>
            )
        } else {
            form = (
                <div className="authenticaton-links">
                    <Link to="/user-sessions/new">Sign In</Link>
                    <Link to="/users/new">Sign Up</Link>
                </div>
            )
        }
    }

    return (
        <div className="show-page page-height">
            <h1>{restaurant.name}</h1>
            <div className="info-banner">
                <img className="show-page-image" src={restaurant.image_url}/>
                <div className="show-page-details">
                    <h4>{restaurant.location?.display_address[0]} - {restaurant.location?.display_address[1]}</h4>
                    <h4>{restaurant.display_phone}</h4>
                    <h4 className="green-font">{transactionTypes}</h4>
                    <h4>{restaurant.rating} stars (from {restaurant.review_count} Yelp reviews)</h4>
                </div>
            </div>
            <h2>Reviews</h2>
            <input className="button" type="button" value="LEAVE A REVIEW" onClick={handleFormRequest}/>
            {form}
            <div>{reviewList}</div>
        </div>
    )
}

export default RestaurantShowPage