import React from "react"
import photo from "../assets/img/IMG_0847.jpg"

const AboutMePage = () => {
    return (
        <div className="about-page page-height">
            <img src={photo} />
            <h3>Nyck Jean-Philippe</h3>
            <h5>Full Stack Web Developer</h5>
            <p>
                Discovered my love for coding in middle school. 
                Since then, from game development to web development, 
                I've been building my experience with code and having fun with it as well. 
                My hobbies include game development, making music, and recreational sports with friends.
            </p>
        </div>
    )
} 

export default AboutMePage