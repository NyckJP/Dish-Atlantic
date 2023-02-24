import React, { useState } from "react";

const NewDishReviewForm = ({ postReview }) => {
    const [newReview, setNewReview] = useState({
        dishName: "",
        content: "",
        isLiked: ""
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
                Name of Dish:
                <input 
                    type="text" 
                    name="dishName" 
                    onChange={handleInputChange}
                    value={newReview.dishName}
                />
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

            <label>
                Do you like this dish?: <br/>
                <input type="radio" id="yes" name="isLiked" value={true} onChange={handleInputChange} />
                <label htmlFor="yes">YES</label>
                <input type="radio" id="no" name="isLiked" value={false} onChange={handleInputChange} />
                <label htmlFor="no">NO</label>
            </label>
            
            <input className="button" type="submit" value="Submit" />
        </form>
    )
}

export default NewDishReviewForm