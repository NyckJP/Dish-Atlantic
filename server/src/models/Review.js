const Model = require('./Model.js')

class Review extends Model{
    static get tableName() {
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["topic", "recommended", "content"],
            properties: {
                topic: { type: "string", minLength: 1 },
                recommended: { type: ["boolean", "string"] },
                content: { type: "string", minLength: 1 }
            }
        }
    }

    static get relationMappings() {
        const { User, HelpfulVote } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            },
            helpfulVotes: {
                relation: Model.HasManyRelation,
                modelClass: HelpfulVote,
                join: {
                    from: "reviews.id",
                    to: "helpfulVotes.reviewId"
                }
            }
        }
    }
}

module.exports = Review