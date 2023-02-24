import express from "express"
import { Review } from "../../../models/index.js"
import objection from "objection"
const { ValidationError } = objection
import cleanUserInput from "../../../services/cleanUserInput.js";

const reviewsRouter = new express.Router()

reviewsRouter.post("/", async (req, res) => {
    const formInput = cleanUserInput(req.body)
    const { dishName, content, isLiked, restaurantId } = formInput
    const userId = req.user.id

    try {
        const newReview = await Review.query().insertAndFetch({ dishName, content, isLiked, userId, restaurantId })
        return res.status(201).json({ review: newReview })
    } catch (error) {
        console.log(error)
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})

reviewsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await Review.query().deleteById(id)
        return res.status(204).json({})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

reviewsRouter.patch("/:id", async (req, res) => {
    const { dishName, content, isLiked } = req.body
    const { id } = req.params
    try {
        const editedReview = await Review.query().patchAndFetchById( id, { dishName, content, isLiked })
        return res.status(200).json({ review: editedReview})
    } catch (error) {
        console.log(error)
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data });
        }
        return res.status(500).json({ errors: error })
    }
})

export default reviewsRouter