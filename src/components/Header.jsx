import react from "react"
import discord from "../assets/discord.png"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAnimate, stagger } from "framer-motion"
import {reveal} from "../utils/animation.ts"
import { useCookies } from 'react-cookie'

export default function() {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    function logout() {
        console.log("CLICK")
        removeCookie("user")
    }

    return( 
        <motion.div className="header" initial="hiddenVariant" animate ="revealedVariant" transition={{
            staggerChildren: 0.1,
            duration:0.5,
            delayChildren: 0.5
        }}>
            <div className="header--left">
            <Link to="/" className = "header--text">
            <motion.img src = {discord} className="header--img" initial={{ opacity: 0 }} animate= {{opacity: 1}} transition={{duration: 0.5}}/>
            </Link>
            
            <Link to="/" className = "header--text"><motion.div variants={reveal}>DiscordX</motion.div></Link>
            </div>

            {cookies.user ? <Link to="/meme" className = "header--link"><motion.div variants={reveal} whileHover={{scale: 1.1}}>Channel Monitor</motion.div></Link> : <></>}
            {!cookies.user ? 
            <div className="link--box">
                <Link to="/register" className = "header--link"><motion.div variants={reveal} whileHover={{scale: 1.1}}>Register</motion.div></Link> 
                <Link to="/login" className = "header--link"><motion.div variants={reveal} whileHover={{scale: 1.1}}>Login</motion.div></Link>
            </div>
            : 
            <div className = "header--link" onClick={logout}><motion.div variants={reveal} whileHover={{scale: 1.1}}>Logout</motion.div></div> 
            }

        </motion.div>
    )
}