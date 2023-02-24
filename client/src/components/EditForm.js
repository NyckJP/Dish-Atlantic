import React, { useState } from "react"

const EditForm = ({ editReview, dishName, content, isLiked }) => {
    const [editedReview, setEditedReview] = useState({
        dishName: dishName,
        content: content,
        isLiked: isLiked
    })
    const [errors, setErrors] = useState([])

    const handleInputChange = event => {
        setEditedReview({
            ...editedReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        editReview(editedReview)
    }
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Name of Dish:
                    <input 
                        type="text" 
                        name="dishName" 
                        onChange={handleInputChange}
                        value={editedReview.dishName}
                    />
                </label>

                <label>
                    Thoughts:
                    <textarea 
                        type="text" 
                        name="content" 
                        onChange={handleInputChange}
                        value={editedReview.content}
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
            
        </>
    )
}

export default EditForm