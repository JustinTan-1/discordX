import React from "react"
import memesData from "../memesData.js"

export default function Meme() {
    const [allMemeImages, setMemeImagesData] = React.useState(memesData.data.memes)
    const [memeData, setMemeData] = React.useState({topText: "", bottomText: "", randomImage: "http://i.imgflip.com/1bij.jpg"})

    function handleChange(event) {
        const {name, value} = event.target
        setMemeData(prevMemeData => {
            return {
                ...prevMemeData,
                [name]: value
            }
        })
    }

    function getMeme() {
        const url = allMemeImages[Math.floor(Math.random()*allMemeImages.length)].url
        setMemeData(prevMeme => {
            return ({...prevMeme, randomImage: url})
        })
    }
    return (
        <main>
            <div className="form">
                <label> Top Text
                <input type="text"
                className="form--input" placeholder="When you discover" onChange={handleChange}
                name = "topText"
                value = {memeData.topText}/>
                </label>
                <label> Bottom Text
                <input type="text"
                className="form--input"
                placeholder="Meme Generator" onChange={handleChange}
                name = "bottomText"
                value = {memeData.bottomText}/>
                </label>
                <button className="form--button" onClick={getMeme}>Generate Meme</button>
            </div>
            <div className="meme">
                <img src={memeData.randomImage} className="meme--image" />
                <h2 className="meme--text top">{memeData.topText}</h2>
                <h2 className="meme--text bottom">{memeData.bottomText}</h2>
            </div>
        </main>
    )
}