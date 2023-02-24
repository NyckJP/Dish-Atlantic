const Model = require('./Model.js')

class Review extends Model{
    static get tableName() {
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["dishName", "content", "isLiked"],
            properties: {
                dishName: { type: "string", minLength: 1 },
                content: { type: "string", minLength: 1 },
                isLiked: { type: ["boolean", "string"] }
            }
        }
    }

    static get relationMappings() {
        const { User } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Review