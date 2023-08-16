import express from "express"
import { User, SavedId } from "../../../models/index.js"
import findCache from "../../../services/findCache.js"

const savedIdsRouter = new express.Router()

savedIdsRouter.post("/", async (req, res) => {
    const { restaurantId, savedAs } = req.body
    const userId = req.user.id

    try {
        const currentUser = await User.query().findById(userId)
        const existingSavedId = await currentUser.$relatedQuery("savedIds").findOne({
            restaurantId: restaurantId,
            savedAs: savedAs
        })
        if(!existingSavedId) {
            const newSavedId = await SavedId.query().insertAndFetch({ userId, restaurantId, savedAs})
            return res.status(201).json({ newSavedId: newSavedId })
        } else {
            await currentUser.$relatedQuery("savedIds").findOne({
                restaurantId: restaurantId,
                savedAs: savedAs
            }).delete()
            return res.status(200).json({ message: "savedId deleted" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

savedIdsRouter.get("/ids", async (req, res) => {
    const userId = req.user.id

    try {
        const currentUser = await User.query().findById(userId)
        const savedIds = await currentUser.$relatedQuery("savedIds")
        return res.status(200).json({ savedIds: savedIds })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

savedIdsRouter.get("/restaurants", async (req, res) => {
    const userId = req.user.id

    try {
        const currentUser = await User.query().findById(userId)
        const favorites = await currentUser.$relatedQuery("savedIds").where("savedAs", "=", "FAVORITE")
        const favoritesList = await findCache(favorites)
        const tryLaters = await currentUser.$relatedQuery("savedIds").where("savedAs", "=", "TRY LATER")
        const tryLatersList = await findCache(tryLaters)
        res.status(200).json({ favorites: favoritesList, tryLaters: tryLatersList})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default savedIdsRouter