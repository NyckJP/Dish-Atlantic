import React from "react"
import photo from "../assets/img/IMG_0847.jpg"

const AboutMePage = () => {
    return (
        <div className="about-page">
            <img src={photo} className="photo" />
            <p>Image of Me</p>
        </div>
    )
} 

export default AboutMePage