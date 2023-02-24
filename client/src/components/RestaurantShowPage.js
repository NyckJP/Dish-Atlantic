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
            form = <NewDishReviewForm postReview={postReview} />
        } else {
            form = <Link to="/user-sessions/new">Sign In</Link>
        }
    }

    return (
        <div className="show-page">
            <h1>{restaurant.name}</h1>
            <img src={restaurant.image_url}/>
            <h4>Rating: {restaurant.rating} (of {restaurant.review_count} reviews)</h4>
            <h4>Phone Number: {restaurant.display_phone}</h4>
            <input className="button" type="button" value="LEAVE A REVIEW" onClick={handleFormRequest}/>
            <ErrorList errors={errors} />
            {form}
            <div>{reviewList}</div>
        </div>
    )
}

export default RestaurantShowPage