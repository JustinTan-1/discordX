import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {reveal, popup} from "../utils/animation.ts"
import { data } from "framer-motion/client"
import constants from "../utils/constants.js"
import { useCookies } from 'react-cookie'
import { redirect } from "react-router-dom"
import  { useNavigate } from "react-router-dom"
 
export default function Login() {

    const url = constants.url
    const [userData, setUserData] = React.useState({username: "", password: ""})
    const [cookie, setCookie] = useCookies(['user'])
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = React.useState(false)
    const [showError, setShowError] = React.useState(false)
    const [msg, setMsg] = React.useState('')

    function handleChange(event) {
        const {name, value} = event.target
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [name]: value
            }
        })
    }

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

    function register() {
        if (userData.username != "" && userData.password != "" && userData.token != "") {
            fetch(`${url}/api/login`, {
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
                        setMsg(data.error)
                        setShowError(true)
                    } else {
                        setMsg("SUCCESS")
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
            <motion.div variants={reveal} className="form--login">
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
                <motion.button whileHover={{scale: 1.01}} whileTap={{scale:0.95}} className="form--button--login" onClick={register}>Login</motion.button>
            </motion.div>
            <AnimatePresence>
            {showPopup && <motion.div variants={popup} initial= "initial" animate = "animate" exit= "exit" className="popupSuccess">{msg}</motion.div>}
            {showError && <motion.div variants={popup} initial= "initial" animate = "animate" exit= "exit" className="popupError">{msg}</motion.div>}
            </AnimatePresence>
        </motion.main>
    )
}