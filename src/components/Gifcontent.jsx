import React from "react"
import { motion } from "framer-motion"
import {reveal} from "../utils/animation.ts"
 
export default function Gifcontent() {

    const [allGifs, setAllGifData] = React.useState([])
    const [gifData, setGifData] = React.useState({topText: "", bottomText: "", randomGif: "https://media.tenor.com/62wK1Xyhp_EAAAPw/happy.mp4", gifSearch: ""})
    const [gifQuery, setGifQuery] = React.useState("excited")

    React.useEffect(() => {
        fetch(`https://tenor.googleapis.com/v2/search?q=${gifQuery}&limit=50&key=%20AIzaSyBfgO-XYqzUSAm8ECbo1OqsuUb1drB8slQ`)
            .then(res => res.json())
            .then(data => setAllGifData(data.results))
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
        console.log(allGifs)
        gifData.gifSearch != "" && setGifQuery(gifData.gifSearch) 
        const url = allGifs[Math.floor(Math.random()*allGifs.length)].media_formats.loopedmp4.url
        setGifData(prevGif => {
            return ({...prevGif, randomGif: url})
        })
        console.log(url)
        console.log(gifData.randomGif)
        const container = document.querySelector(".container")
        container.removeChild(document.getElementById("gifContainer"))
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
        <motion.main variants={reveal} initial = "hiddenVariant" animate="revealedVariant" transition={{
            ease: "easeIn",
            type: "spring",
            staggerChildren: 1,
            duration: 0.7}}>
            <motion.div variants={reveal} className="form--gif">
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
                <label> Search Gif
                <input type="text"
                className="form--input--giftype"
                placeholder="Excited"
                name = "gifSearch"
                value = {gifData.gifSearch}
                onChange={handleChange}
                />
                </label>
                <motion.button whileHover={{scale: 1.01}} whileTap={{scale:0.95}} className="form--button--gif" onClick={getGif}>Generate Gif</motion.button>
            </motion.div>
            
            <motion.div className="container" variants={reveal}>
                <video className="meme--image" autoPlay={true} loop={true} id="gifContainer">
                <source src={gifData.randomGif}type="video/mp4"/>
                </video>
                <h2 className="meme--text top">{gifData.topText}</h2>
                <h2 className="meme--text bottom">{gifData.bottomText}</h2>
            </motion.div>
        </motion.main>
    )
}