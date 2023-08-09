import express from "express"
import objection from "objection"
import { Review, HelpfulVote } from "../../../models/index.js"

const { ValidationError } = objection
const reviewsHelpfulVotesRouter = new express.Router()

reviewsHelpfulVotesRouter.post("/", async (req, res) => {
    const { body } = req
    try {
        const review = await Review.query().findById(body.reviewId)
        await HelpfulVote.addHelpfulVote(body)
        const helpfulVotes = await review.$relatedQuery("helpfulVotes")
        const newHelpfulVoteCount = helpfulVotes.length
        return res.status(201).json({ newHelpfulVoteCount: newHelpfulVoteCount})
    } catch (error) {
        if (error instanceof ValidationError) {
          return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})

export default reviewsHelpfulVotesRouter