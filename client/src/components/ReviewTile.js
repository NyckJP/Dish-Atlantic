import React, { useState } from "react";
import translateServerErrors from "../services/translateServerErrors";
import EditForm from "./EditForm.js"
import ErrorList from "./layout/ErrorList"

const ReviewTile = ({ id, dishName, content, isLiked, deleteReview, restaurant, setRestaurant, userId, user }) => {
    const [shouldRenderEditForm, setShouldRenderEditForm] = useState(false)
    const [errors, setErrors] = useState([])

    const editReview = async(editData) => {
        try {
            const response = await fetch(`/api/v1/reviews/${id}`, {
                method: 'PATCH',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(editData)
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const parsedResponse = await response.json()
                    const newErrors = translateServerErrors(parsedResponse.errors)
                    return setErrors(newErrors)
                }
                throw new Error(`${response.status} (${response.statusText})`);
            }
            const parsedResponse = await response.json()
            const reviews = restaurant.reviews
            const editedReviewIndex = reviews.findIndex(review => review.id === parsedResponse.review.id)
            reviews[editedReviewIndex] = parsedResponse.review
            setRestaurant({ ...restaurant, reviews: reviews })
            setShouldRenderEditForm(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = event => {
        event.preventDefault()
        deleteReview(id)        
    }

    const handleEditClick = event => {
        event.preventDefault()
        setShouldRenderEditForm(!shouldRenderEditForm)
    }

    let controls
    if(user && user.id === userId){
        controls = (
            <div className="button-group">
                <input className="button" type="button" value="Delete" onClick={handleDelete} />
                <input className="button" type="button" value="Edit" onClick={handleEditClick}/>
            </div>
        )
    }
    let form
    if(shouldRenderEditForm){
        form = (
            <>
                <EditForm editReview={editReview} dishName={dishName} content={content} isLiked={isLiked}/>
                <ErrorList errors={errors}/>
            </>
        )
    }
    
    return (
        <div className="callout secondary">
            <h3>Dish Name: {dishName}</h3>
            <h5>Content: {content}</h5>
            <h5>Liked: {isLiked.toString()}</h5>
            {controls}
            {form}
        </div>
    )
}

export default ReviewTile