import react from "react"
import troll from "../assets/troll.png"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAnimate, stagger } from "framer-motion"
import {reveal} from "../utils/animation.ts"

export default function() {
    return( 
        <motion.div className="header" initial="hiddenVariant" animate ="revealedVariant" transition={{

            staggerChildren: 0.1,
            duration:0.5,
            delayChildren: 0.5
        }}>
            <Link to="/" className = "header--text">
            <motion.img src = {troll} className="header--img" initial={{ opacity: 0 }} animate= {{opacity: 1}} transition={{duration: 0.5}}/>
            </Link>

            <Link to="/" className = "header--text"><motion.div variants={reveal}>Meme Generator</motion.div></Link>
            <Link to="/meme" className = "header--link"><motion.div variants={reveal} whileHover={{scale: 1.1}}>Static Memes</motion.div></Link>
            <Link to="/gif" className = "header--link"><motion.div variants={reveal} whileHover={{scale: 1.1}}>Gifs</motion.div></Link>

        </motion.div>
    )
}