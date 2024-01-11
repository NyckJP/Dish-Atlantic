import express from "express"
import reviewsRouter from "./api/v1/reviewsRouter.js"
import restaurantsRouter from "./api/v1/restaurantsRouter.js"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import savedIdsRouter from "./api/v1/savedIdsRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/restaurants", restaurantsRouter)
rootRouter.use("/api/v1/reviews", reviewsRouter)
rootRouter.use("/api/v1/savedIds", savedIdsRouter)

export default rootRouter
