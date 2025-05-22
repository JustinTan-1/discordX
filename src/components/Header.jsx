import react from "react"
import discord from "../assets/discord.png"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAnimate, stagger } from "framer-motion"
import {reveal} from "../utils/animation.ts"
import { useCookies } from 'react-cookie'
import constants from "../utils/constants.js"

export default function() {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const url = constants.url

    function logout() {
        fetch(`${url}/api/logout`)
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
            {cookies.user ? <Link to="/monitor" className = "header--link"><motion.div variants={reveal} whileHover={{backgroundColor: "grey"}}><p className="link--text">Channel Monitor</p></motion.div></Link> : <></>}
            </div>

            
            {!cookies.user ? 
            <div className="link--box">
                <Link to="/register" className = "header--link"><motion.div variants={reveal} whileHover={{backgroundColor: "grey"}}><p className="link--text">Register</p></motion.div></Link> 
                <Link to="/login" className = "header--link"><motion.div variants={reveal} whileHover={{backgroundColor: "grey"}}><p className="link--text">Login</p></motion.div></Link>
            </div>
            : 
            <div className = "header--link" onClick={logout}><motion.div variants={reveal} whileHover={{backgroundColor: "grey"}}><p className="link--text">Logout</p></motion.div></div> 
            }

        </motion.div>
    )
}