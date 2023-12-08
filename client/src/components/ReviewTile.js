import React, { useState, useEffect } from "react"
import translateServerErrors from "../services/translateServerErrors"
import EditForm from "./EditForm.js"
import ErrorList from "./layout/ErrorList"

const ReviewTile = ({ id, topic, recommended, content, helpfulVoteCount, deleteReview, restaurant, setRestaurant, userId, user }) => {
    const [author, setAuthor] = useState("")
    const [shouldRenderEditForm, setShouldRenderEditForm] = useState(false)
    const [errors, setErrors] = useState([])

    const getAuthor = async () => {
        try {
            const response = await fetch(`/api/v1/users/${userId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const parsedUser = await response.json()
            setAuthor(parsedUser.user.userName)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }

    useEffect(() => {
        getAuthor()
    }, [])

    const addHelpfulVote = async () => {
        try {
            const response = await fetch(`/api/v1/reviews/${id}/helpfulVotes`, {
                method: "POST",
                headers: new Headers({
                "Content-Type": "application/json",
                }),
                body: JSON.stringify({ reviewId: id, userId: user.id }),
            })
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            } else {
                const body = await response.json()
                const newHelpfulVoteCount = body.newHelpfulVoteCount
                const editedReviews = restaurant.reviews
                const editedId = editedReviews.findIndex((review) => review.id === id)
                editedReviews[editedId].helpfulVoteCount = newHelpfulVoteCount
                setRestaurant({ ...restaurant, reviews: editedReviews })
            }
        } catch (error) {
          console.error(`Error in vote fetch: ${error.message}`)
        }
    }

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
                throw new Error(`${response.status} (${response.statusText})`)
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

    const handleHelpfulVote = event => {
        event.preventDefault()
        addHelpfulVote()
    }

    const handleDelete = event => {
        event.preventDefault()
        deleteReview(id)        
    }

    const handleEdit = event => {
        event.preventDefault()
        setShouldRenderEditForm(!shouldRenderEditForm)
    }

    let recommendation
    if (recommended) {
        recommendation = <h5 className="green-font">Would Recommend</h5>
    } else {
        recommendation = <h5 className="red-font">Wouldn't Recommend</h5>
    }

    if(!helpfulVoteCount) {
        helpfulVoteCount = 0;
    }

    let helpfulVoteButton
    let controls
    if(user){
        helpfulVoteButton = <p><i className="fa-solid fa-handshake-angle clickable" onClick={handleHelpfulVote} /> {helpfulVoteCount} people found this helpful</p>
        if(user.id === userId){
            controls = (
                <div className="button-group">
                    <input className="button" type="button" value="Delete" onClick={handleDelete} />
                    <input className="button" type="button" value="Edit" onClick={handleEdit}/>
                </div>
            )
        }
    } else {
        helpfulVoteButton = <p><i className="fa-solid fa-handshake-angle"/> {helpfulVoteCount} people found this helpful</p>
    }

    let editForm
    if(shouldRenderEditForm){
        editForm = (
            <>
                <EditForm editReview={editReview} topic={topic} recommended={recommended} content={content} />
                <ErrorList errors={errors}/>
            </>
        )
    }
    
    return (
        <div className="callout review-tile">
            <p>Review by {author}</p>
            <h3>{topic}</h3>
            {recommendation}
            <h5>{content}</h5>
            {helpfulVoteButton}
            {controls}
            {editForm}
        </div>
    )
}

export default ReviewTile