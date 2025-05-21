import React from "react"
import { motion } from "framer-motion"
import {reveal} from "../utils/animation.ts"
import { data } from "framer-motion/client"
 
export default function Login() {

    const [userData, setUserData] = React.useState({username: "", password: ""})

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
            fetch("http://127.0.0.1:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ username: userData.username, password: userData.password })
            })
            .then (
                res => res.json()
            )
            .then (
                data => {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        console.log("SUCESS")
                    }
                }
            )
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
                <motion.button whileHover={{scale: 1.01}} whileTap={{scale:0.95}} className="form--button--gif" onClick={register}>Login</motion.button>
            </motion.div>
        </motion.main>
    )
}