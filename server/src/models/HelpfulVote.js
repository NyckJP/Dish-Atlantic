const Model = require("./Model.js")

class HelpfulVote extends Model{
    static get tableName(){
        return "helpfulVotes"
    }

    static get jsonSchema(){
        return{
            type: "object",
            required: ["userId", "reviewId"],
            properties: {
                userId: { type: ["string", "integer"] },
                reviewId: { type: ["string", "integer"] }
            }
        }
    }

    static get relationMappings(){
        const { User, Review } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join:{
                    from: "helpfulVotes.userId",
                    to: "user.id"
                }
            },
            review: {
                relation: Model.BelongsToOneRelation,
                modelClass: Review,
                join: {
                  from: "helpfulVotes.reviewId",
                  to: "review.id"
                }
              }
        }
    }

    static async addHelpfulVote(newHelpfulVote){
        const HelpfulVoteExists = await HelpfulVote.query().findOne({userId: newHelpfulVote.userId, reviewId: newHelpfulVote.reviewId})
        let postedHelpfulVote
        if (!HelpfulVoteExists) {
            postedHelpfulVote = await HelpfulVote.query().insertAndFetch(newHelpfulVote)
        } else {
            postedHelpfulVote = await HelpfulVote.query().deleteById(HelpfulVoteExists.id)
        }
        return postedHelpfulVote
    }
}

module.exports = HelpfulVote