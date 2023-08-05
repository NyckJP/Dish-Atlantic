import React from "react";

const Footer = () => {
    const socials = [
        {
            name: "Gmail",
            href: "mailto:nyckjeanphilippe@gmail.com",
            icon: <i className="fa-regular fa-envelope" />
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/nyckjeanphilippe/",
            icon: <i className="fa-brands fa-linkedin" />
        },
        {
            name: "GitHub",
            href: "https://github.com/NyckJP",
            icon: <i className="fa-brands fa-github" />
        }
    ]

    let socialsRow = socials.map((link) => {
        return (
            <a key={link.name} href={link.href}>
                {link.icon}
            </a>
        )
    })

    //About the Developer
    //Headshot and links to linkedin and github
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="about-me">
                    <a href="/about">Made by Nyck Jean-Philippe</a>
                </div>
                <div className="socials">
                    {socialsRow}
                </div>
            </div>
        </footer>
    )
}

export default Footer