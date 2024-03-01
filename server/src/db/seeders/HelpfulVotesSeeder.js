import { Review, HelpfulVote } from "../../models/index.js"

class HelpfulVoteSeeder {
    static async seed() {
        await HelpfulVote.query().delete()

        const reviews = await Review.query()
        for (const review of reviews) {
            const voteCount = Math.floor(Math.random() * 14) + 2
            for (let i = 1; i <= voteCount; i++) {
                await HelpfulVote.query().insert({
                    userId: voteCount,
                    reviewId: review.id
                })
            }
        }
    }
}

export default HelpfulVoteSeeder