import React from "react"

export default function Gifcontent() {
    const API_KEY = ""

    const [allGifs, setAllGifData] = React.useState([])
    const [gifData, setGifData] = React.useState({topText: "", bottomText: "", randomGif: "https://media.tenor.com/62wK1Xyhp_EAAAPw/happy.mp4", gifSearch: ""})
    const [gifQuery, setGifQuery] = React.useState("excited")

    React.useEffect(() => {
        fetch(`https://tenor.googleapis.com/v2/search?q=${gifQuery}&key=%20AIzaSyBfgO-XYqzUSAm8ECbo1OqsuUb1drB8slQ`)
            .then(res => res.json())
            .then(data => setAllGifData(data.results))
            console.log(allGifs)
    }, [gifQuery]) 

    function handleChange(event) {
        const {name, value} = event.target
        setGifData(prevGifData => {
            return {
                ...prevGifData,
                [name]: value
            }
        })
    }

    function getGif() {
        gifData.gifSearch && setGifQuery(gifData.gifSearch) 
        const container = document.querySelector(".container")
        container.removeChild(document.getElementById("gifContainer"))
        const url = allGifs[Math.floor(Math.random()*allGifs.length)].media_formats.loopedmp4.url
        console.log(url)
        setGifData(prevGif => {
            return ({...prevGif, randomGif: url})
        })
        const gifContainer = container.appendChild(document.createElement("video"))
        const video = gifContainer.appendChild(document.createElement("source"))
        setVideoAttributes(gifContainer, video)
        
    }

    function setVideoAttributes(gifContainer, video) {
        gifContainer.id = "gifContainer"
        video.type = "video/mp4"
        gifContainer.autoPlay = true
        gifContainer.loop = true
        gifContainer.type = "video/mp4"
        gifContainer.className = "meme--image"
        video.src = gifData.randomGif
        gifContainer.play()
    }

    return (
        <main>
            <div className="form">
                <label> Top Text
                <input type="text"
                className="form--input" placeholder="When you discover" onChange={handleChange}
                name = "topText"
                value = {gifData.topText}/>
                </label>
                <label> Bottom Text
                <input type="text"
                className="form--input"
                placeholder="Meme Generator" onChange={handleChange}
                name = "bottomText"
                value = {gifData.bottomText}/>
                </label>
                <label> Gif Type
                <input type="text"
                className="form--input--giftype"
                placeholder="Meme Generator"
                name = "gifSearch"
                value = {gifData.gifSearch}
                onChange={handleChange}
                />
                </label>
                <button className="form--button" onClick={getGif}>Generate Gif</button>
            </div>
            
            <div className="container">
                <video className="meme--image" autoPlay={true} loop={true} id="gifContainer">
                <source src={gifData.randomGif}type="video/mp4"/>
                </video>
                <h2 className="meme--text top">{gifData.topText}</h2>
                <h2 className="meme--text bottom">{gifData.bottomText}</h2>
            </div>
        </main>
    )
}