import React, { useState } from "react";

const NewDishReviewForm = ({ postReview }) => {
    const [newReview, setNewReview] = useState({
        topic: "",
        recommended: "",
        content: ""
    })

    const handleInputChange = event => {
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        postReview(newReview)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Topic:
                <input 
                    type="text" 
                    name="topic" 
                    onChange={handleInputChange}
                    value={newReview.topic}
                />
            </label>

            <label>
                Would you recommend?: <br/>
                <input type="radio" id="yes" name="recommended" value={true} onChange={handleInputChange} />
                <label htmlFor="yes">YES</label>
                <input type="radio" id="no" name="recommended" value={false} onChange={handleInputChange} />
                <label htmlFor="no">NO</label>
            </label>

            <label>
                Thoughts:
                <textarea 
                    type="text" 
                    name="content" 
                    onChange={handleInputChange}
                    value={newReview.content}
                />
            </label>
            
            <input className="button" type="submit" value="Submit" />
        </form>
    )
}

export default NewDishReviewForm