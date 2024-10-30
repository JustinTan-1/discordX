import React from "react"
import memesData from "../memesData.js"

export default function Meme() {
    const [allMemeImages, setMemData] = React.useState(memesData.data.memes)
    const [meme, setImage] = React.useState({topText: "", bottomText: "", randomImage: "http://i.imgflip.com/1bij.jpg"})

    function getMeme() {
        const url = allMemeImages[Math.floor(Math.random()*allMemeImages.length)].url
        setImage(prevMeme => {
            return ({...prevMeme, randomImage: url})
        })
    }
    return (
        <main>
            <div className="form">
                <label> Top Text
                <input type="text"
                className="form--input" placeholder="When you discover"/>
                </label>
                <label> Bottom Text
                <input type="text"
                className="form--input"
                placeholder="Meme Generator"/>
                </label>
                <button className="form--button" onClick={getMeme}>Generate Meme</button>
            </div>
            <img src={meme.randomImage} className="meme--image"/>
        </main>
    )
}