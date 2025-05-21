import Header from "../components/Header"
import {reveal} from "../utils/animation"
import {motion} from "framer-motion"
import React from "react"

export default function Home() {
    const [allGifs, setAllGifs] = React.useState([])

    React.useEffect(() => {
        fetch(`https://tenor.googleapis.com/v2/search?q=discordwumpus&ar_range=wide&limit=10&key=%20AIzaSyBfgO-XYqzUSAm8ECbo1OqsuUb1drB8slQ`)
            .then(res => res.json())
            .then(data => setAllGifs(data.results))
    }, [])
    const videos = allGifs.map( gif => {
        return (<video autoPlay={true} loop={true} className={`home--videos vid${allGifs.indexOf(gif)}`}><source src={gif.media_formats.loopedmp4.url}/></video>)
    })
    console.log(videos)
    return (
        <div>
        <Header />
        <motion.div variants={reveal} initial="hiddenVariant" animate="revealedVariant" transition={{
            ease: "easeIn",
            type: "tween",
            staggerChildren: 0.1,
            duration: 0.5}} className="home--content">
            <h1 className="home--text">Discord Message Manager</h1>
        <div className="video--container">
        {videos}
        </div>
        </motion.div>
        </div>
    )
}