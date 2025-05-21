import React from "react"
import { motion } from "framer-motion"
import {reveal} from "../utils/animation.ts"
 
export default function Register() {

    const [userData, setUserData] = React.useState({username: "", password: "", token: "",})

    function handleChange(event) {
        const {name, value} = event.target
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [name]: value
            }
        })
    }

    function register() {
        if (userData.username != "" && userData.password != "" && userData.token != "") {
            console.log(userData)
        }
    }


    return (
        <motion.main initial = "hiddenVariant" animate="revealedVariant" transition={{
            ease: "easeIn",
            type: "spring",
            staggerChildren: 1,
            duration: 0.7}}>
            <motion.div variants={reveal} className="form--gif">
                <label> Username
                <input type="text"
                className="form--input" onChange={handleChange}
                name = "username"
                value = {userData.username}/>
                </label>
                <label> Password
                <input type="text"
                className="form--input"
                onChange={handleChange}
                name = "password"
                value = {userData.password}/>
                </label>
                <label> Discord Token
                <input type="text"
                className="form--input--giftype"
                name = "token"
                value = {userData.token}
                onChange={handleChange}
                />
                </label>
                <motion.button whileHover={{scale: 1.01}} whileTap={{scale:0.95}} className="form--button--gif" onClick={register}>Register</motion.button>
            </motion.div>
        </motion.main>
    )
}