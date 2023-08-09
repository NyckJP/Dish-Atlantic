class ReviewSerializer {
    static async getSummary(review) {
        const allowedAttributes = ["id", "topic", "recommended", "content", "userId"]

        let serializedReview = {}
        for (const attribute of allowedAttributes) {
            serializedReview[attribute] = review[attribute]
        }

        const helpfulVotes = await review.$relatedQuery("helpfulVotes")
        serializedReview.helpfulVoteCount = helpfulVotes.length

        return serializedReview
    }
}

export default ReviewSerializer