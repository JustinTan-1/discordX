import React from "react"
import { motion } from "framer-motion"
import {reveal} from "../utils/animation.ts"

export default function Meme() {
    const [allMemes, setAllMemeData] = React.useState([])
    const [memeData, setMemeData] = React.useState({topText: "", bottomText: "", randomImage: "http://i.imgflip.com/1bij.jpg"})

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(returnValue => setAllMemeData(returnValue.data.memes))
    },[])

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
        const url = allMemes[Math.floor(Math.random()*allMemes.length)].url
        setMemeData(prevMeme => {
            return ({...prevMeme, randomImage: url})
        })
    }
    return (
        <motion.main variants={reveal} initial="hiddenVariant" animate="revealedVariant" transition={{
            ease: "easeIn",
            type: "spring",
            staggerChildren: 1,
            duration: 0.7}}>
            <motion.div className="form--meme" variants={reveal}>
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
                <motion.button whileHover={{scale: 1.01}} whileTap={{scale:0.95}} className="form--button--meme" onClick={getMeme}>Generate Meme</motion.button>
            </motion.div>
            <motion.div className="meme" variants={reveal}>
                <img src={memeData.randomImage} className="meme--image" />
                <h2 className="meme--text top">{memeData.topText}</h2>
                <h2 className="meme--text bottom">{memeData.bottomText}</h2>
            </motion.div>
        </motion.main>
    )
}