import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {reveal, popup } from "../utils/animation.ts"
import constants from "../utils/constants.js"
import { useNavigate } from "react-router-dom"
 
export default function Register() {
    const url = constants.url
    const [userData, setUserData] = React.useState({username: "", password: "", confirm: "", token: "",})
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = React.useState(false)
    const [showError, setShowError] = React.useState(false)
    const [msg, setMsg] = React.useState('')

        React.useEffect(() => {
            if (showPopup) {
                setTimeout(() => {
                    setShowPopup(false);
                }, 2000);
            }
        }, [showPopup]);
    
        React.useEffect(() => {
            if (showError) {
                setTimeout(() => {
                    setShowError(false);
                }, 2000);
            }
        }, [showError]);


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
            fetch(`${url}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ username: userData.username, password: userData.password, confirm: userData.confirm, user_token: userData.token })
            })
            .then (
                res => res.json()
            )
            .then (
                data => {
                    if (data.error) {
                        setMsg(data.error)
                        setShowError(true)
                    } else {
                        setMsg("Successfully Registered!")
                        setCookie("user", data.username)
                        setShowPopup(true)
                        setTimeout(() => {
                            navigate("/")
                        }, 1000)
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
            <motion.div variants={reveal} className="form--register">
                <label> Username
                <input type="text"
                className="form--input" onChange={handleChange}
                name = "username"
                value = {userData.username}/>
                </label>
                <label> Password
                <input type="password"
                className="form--input"
                onChange={handleChange}
                name = "password"
                value = {userData.password}/>
                </label>
                <label> Confirm Password
                <input type="password"
                className="form--input--giftype"
                name = "confirm"
                value = {userData.confirm}
                onChange={handleChange}
                />
                </label>
                <label> Discord Token
                <input type="password"
                className="form--input--giftype"
                name = "token"
                value = {userData.token}
                onChange={handleChange}
                />
                </label>
                
                <motion.button whileHover={{scale: 1.01}} whileTap={{scale:0.95}} className="form--button--register" onClick={register}>Register</motion.button>
            </motion.div>
            <AnimatePresence>
            {showPopup && <motion.div variants={popup} initial= "initial" animate = "animate" exit= "exit" className="popupSuccess">{msg}</motion.div>}
            {showError && <motion.div variants={popup} initial= "initial" animate = "animate" exit= "exit" className="popupError">{msg}</motion.div>}
            </AnimatePresence>
        </motion.main>
    )
}