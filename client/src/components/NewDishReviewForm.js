import React, { useState } from "react";
import FormError from "./layout/FormError";

const NewDishReviewForm = ({ postReview }) => {
    const [newReview, setNewReview] = useState({
        topic: "",
        recommended: "",
        content: ""
    })

    const [errors, setErrors] = useState({})

    const validateInput = (payload) => {
        setErrors({})
        const { topic, recommended, content } = payload
        let newErrors = {}
        if(topic.trim() == "") {
            newErrors = {
                ...newErrors,
                topic: "is invalid"
            }
        }

        if(recommended == "") {
            newErrors = {
                ...newErrors,
                recommended: "is required"
            }
        }

        if(content == "") {
            newErrors = {
                ...newErrors,
                content: "is required"
            }
        }

        setErrors(newErrors)
    }

    const handleInputChange = event => {
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        validateInput(newReview)
        if(Object.keys(errors).length === 0) {
            postReview(newReview)
        }
    }

    return (
        <form className="callout new-review-form" onSubmit={handleSubmit}>
            <h4 className="text-center">New Review</h4>

            <label>
                Topic:
                <input 
                    type="text" 
                    name="topic" 
                    onChange={handleInputChange}
                    value={newReview.topic}
                    placeholder="'Experience' or name of dish"
                />
                <FormError error={errors.topic} />
            </label>

            <label>
                Would you recommend?: <br/>
                <input type="radio" id="yes" name="recommended" value={true} onChange={handleInputChange} />
                <label htmlFor="yes">YES</label>
                <input type="radio" id="no" name="recommended" value={false} onChange={handleInputChange} />
                <label htmlFor="no">NO</label>
                <FormError error={errors.recommended} />
            </label>

            <label>
                Thoughts:
                <textarea 
                    type="text" 
                    name="content" 
                    onChange={handleInputChange}
                    value={newReview.content}
                />
                <FormError error={errors.content} />
            </label>
            
            <div className="center-items">
                <input className="button review-form-submit" type="submit" value="Submit" />
            </div>
        </form>
    )
}

export default NewDishReviewForm