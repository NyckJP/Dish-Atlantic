import React, { useState, useEffect } from "react" 

const SaveButtons = ({ restaurantId, setShouldRedirect, user }) => {
    const [favorited, setFavorited] = useState(false)
    const [savedForLater, setSavedForLater] = useState(false)

    const getSaveStatus = async () => {
        try {
            const response = await fetch(`/api/v1/savedIds/${restaurantId}`)
            const parsedResponse = await response.json()
            if(parsedResponse.favorited) {
                setFavorited(true)
            }
            if(parsedResponse.savedForLater) {
                setSavedForLater(true)
            }
        } catch (error) {
            console.error(`Error in getSaveStatus fetch: ${error.message}`)
        }
    }

    const saveId = async ( saveAs ) => {
        try {
            const response = await fetch("/api/v1/savedIds", {
                method: "post",
                headers: new Headers({ 'Content-type': 'application/json' }),
                body: JSON.stringify({ restaurantId: restaurantId, savedAs: saveAs })
            })
        } catch (error) {
            console.error(`Error in favorite fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getSaveStatus()
    }, [])

    const handleFavoriteClick = () => {
        if(!user && setShouldRedirect) {
            setShouldRedirect(true)
        } else {
            saveId("FAVORITE")
            setFavorited(!favorited)
        }
    }
    const handleTryLaterClick = () => {
        if(!user && setShouldRedirect) {
            setShouldRedirect(true)
        } else {
            saveId("TRY LATER")
            setSavedForLater(!savedForLater)
        }
    }

    let favoriteButton
    let tryLaterButton
    if(favorited) {
        favoriteButton = <div className="save-buttons" onClick={handleFavoriteClick}><i className="fa-solid fa-star" style={{color: "#ffd500",}}/> Favorited</div>
    } else {
        favoriteButton = <div className="save-buttons" onClick={handleFavoriteClick}><i className="fa-regular fa-star" /> Favorite</div>
    }
    if(savedForLater) {
        tryLaterButton = <div className="save-buttons" onClick={handleTryLaterClick}><i className="fa-solid fa-clock" style={{color: "#7a00cc",}}/> Saved for Later</div>
    } else {
        tryLaterButton = <div className="save-buttons" onClick={handleTryLaterClick}><i className="fa-regular fa-clock" /> Try Later</div>
    }

    return (
        <>
            {favoriteButton}
            {tryLaterButton}
        </>
    )
}

export default SaveButtons