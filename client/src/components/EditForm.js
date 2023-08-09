import React, { useState } from "react"

const EditForm = ({ editReview, topic, recommended, content }) => {
    const [editedReview, setEditedReview] = useState({
        topic: topic,
        recommended: recommended,
        content: content
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
        <form onSubmit={handleSubmit}>
            <label>
                Topic:
                <input 
                    type="text" 
                    name="topic" 
                    onChange={handleInputChange}
                    value={editedReview.topic}
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
                    value={editedReview.content}
                />
            </label>
            
            <input className="button" type="submit" value="Submit" />
        </form>
    )
}

export default EditForm