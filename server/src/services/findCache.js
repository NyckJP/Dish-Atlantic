import { CachedRestaurant } from "../models/index.js";
import YelpClient from "../apiClient/YelpClient.js";

const isVerified = (existingCache) => {
    if(!existingCache) {
        return false
    }

    const cacheTimestamp = existingCache.createdAt.getTime()
    const currentTime = new Date().getTime()
    if(currentTime - cacheTimestamp >= 24 * 60 * 60 * 1000) {
        return false
    }

    return true    
}

const sleep = async () => {
    return new Promise(resolve => setTimeout(resolve, 1000))
}

const findCache = async (savedIds) => {
    let cacheList = []
    // let counter = 0

    for(let i = 0; i < savedIds.length; i++){
        const existingCache = await CachedRestaurant.query().findOne("restaurantId", "=", savedIds[i].restaurantId)
        if(isVerified(existingCache)) {
            const singleRestaurantData = await YelpClient.getRestaurant(savedIds[i].restaurantId)
            const singleRestaurant = JSON.parse(singleRestaurantData.body)
            const newCache = {
                restaurantId: singleRestaurant.id,
                imageUrl: singleRestaurant.image_url,
                name: singleRestaurant.name,
                address: singleRestaurant.location.address1,
                isOpen: !singleRestaurant.is_closed
            }
            const newCacheEntry = await CachedRestaurant.query().insertAndFetch(newCache)
            cacheList.push(newCacheEntry)
        } else {
            cacheList.push(existingCache)
        }
    }

    return cacheList
}

export default findCache