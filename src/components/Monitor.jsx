import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {reveal, popup} from "../utils/animation.ts"
import { data } from "framer-motion/client"
import constants from "../utils/constants.js"
import { useCookies } from 'react-cookie'
import  { useNavigate } from "react-router-dom"
 
export default function Login() {

    const url = constants.url
    const [channelData, setChannelData] = React.useState({channel_id: "", msgCount: "", filter: ""})
    const [cookie, setCookie] = useCookies(['user'])
    const [showPopup, setShowPopup] = React.useState(false)
    const [showError, setShowError] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const [messages, setMessages] = React.useState([])

    function handleChange(event) {
        const {name, value} = event.target
        setChannelData(prevChannelData => {
            return {
                ...prevChannelData,
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

    function monitor() {
        if (channelData.channel_id != "" && channelData.msgCount != "") {
            fetch(`${url}/api/monitor`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ channel_id: channelData.channel_id, msgCount: channelData.msgCount, filter: channelData.filter})
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
                        const temp_msgs = []
                        const allMsgs = data.data
                        for (let key in allMsgs) {
                            temp_msgs.push(`${allMsgs[key]['content']}  |  ${allMsgs[key]["author"]["username"]}  |   ${allMsgs[key]["timestamp"]} `)
                        }
                        setMessages(temp_msgs)
                    }
                }
            )
        }
    }

    const messageDisplay = messages.map(msg => {
        return <div>{msg}</div>
    })


    console.log(messageDisplay)
    return (
        <>
        {cookie.user &&
        <motion.main initial = "hiddenVariant" animate="revealedVariant" transition={{
            ease: "easeIn",
            type: "spring",
            staggerChildren: 1,
            duration: 0.7}}>
            <motion.div variants={reveal} className="form--login">
                <label> Channel ID
                <input type="text"
                className="form--input" onChange={handleChange}
                name = "channel_id"
                value = {channelData.channel_id}/>
                </label>
                <label> Number of Messages (in hundreds)
                <input type="text"
                className="form--input"
                onChange={handleChange}
                name = "msgCount"
                value = {channelData.msgCount}/>
                </label>
                <label> Includes:
                <input type="text"
                className="form--input"
                onChange={handleChange}
                name = "filter"
                value = {channelData.filter}/>
                </label>
                <motion.button whileHover={{scale: 1.01}} whileTap={{scale:0.95}} className="form--button--login" onClick={monitor}>Start Monitoring</motion.button>
            </motion.div>
            <AnimatePresence>
            {showPopup && <motion.div variants={popup} initial= "initial" animate = "animate" exit= "exit" className="popupSuccess">{msg}</motion.div>}
            {showError && <motion.div variants={popup} initial= "initial" animate = "animate" exit= "exit" className="popupError">{msg}</motion.div>}
            </AnimatePresence>
            <div>{messageDisplay}</div>
        </motion.main> 
        }
        </>
    )
}