import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {reveal, popup} from "../utils/animation.ts"
import { data, filter, image } from "framer-motion/client"
import constants from "../utils/constants.js"
import { useCookies } from 'react-cookie'
import  { useNavigate } from "react-router-dom"
import { Switch } from "@mui/material"
import BouncingCircles from "../assets/BouncingCircles.jsx"
 
export default function Login() {

    const url = constants.url
    const [channelData, setChannelData] = React.useState({channel_id: "", msgCount: "", filter: ""})
    const [cookie, setCookie] = useCookies(['user'])
    const [showPopup, setShowPopup] = React.useState(false)
    const [showError, setShowError] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const [messages, setMessages] = React.useState([])
    const [reply, setReply] = React.useState('')
    const [monitorOn, setMonitorOn] = React.useState(false) 
    const [useAi, setUseAi] = React.useState(false)
    const [prompt, setPrompt] = React.useState('')
    const [sendingMsgs, setSendingMsgs] = React.useState(false)
    const [aiImage, setAiImage] = React.useState(false)
    const [imagePrompt, setImagePrompt] = React.useState('')

    function handleChange(event) {
        const {name, value} = event.target
        setChannelData(prevChannelData => {
            return {
                ...prevChannelData,
                [name]: value
            }
        })
    }

    function handleChangeReply(event) {
        const {name, value} = event.target
        setReply(value)
    }

    function handleChangePrompt(event) {
        const {name, value} = event.target
        setPrompt(value)
    }

    function handleChangeImagePrompt(event) {
        const {name, value} = event.target
        setImagePrompt(value)
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
    }, [showError])
    // Calls discord API to fetch channel messages
    function monitor() {
        if (!monitorOn) {
            setMonitorOn(true)
            setMessages([])
        }
        setUseAi(false)
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
                            temp_msgs.push(allMsgs[key])
                        }
                        setMessages(temp_msgs)
                    }
                }
            )
        }
    }

    // Handle replying to checked messages
    const handleSubmit = (event) => {
        setSendingMsgs(true)
        event.preventDefault()
        const reply_array = []
        for (let element of event.target.elements) {
            if (element.checked){
                reply_array.push(element.name)
            }
        }
        if (useAi == false) {
            fetch(`${url}/api/message`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json" 
                },
                body: JSON.stringify({ channel_id: channelData.channel_id, reply_text: reply, mode: "manual", reply_array: reply_array})
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
                        setMsg(data.Success)
                        setShowPopup(true)
                    }
                    setSendingMsgs(false)
                }
            )
        } else {
            fetch(`${url}/api/message`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json" 
                },
                body: JSON.stringify({ channel_id: channelData.channel_id, mode: "ai", reply_array: reply_array, prompt:prompt, aiImage: aiImage, imagePrompt:imagePrompt})
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
                        setMsg(data.Success)
                        setShowPopup(true)
                    }
                    setSendingMsgs(false)
                }
            )
        }    
    }

    function attachmentLoop(attachents) {
        let string = ''
        for (let item of attachents) {
            string += `${item.url}, `
        }
        return string
    }
    // Taking the response from the API and formatting it
    const messageDisplay = messages.map(msg => {
        console.log(msg)
        return <><div key={msg['id']}>{`${msg['content']}  |  `} <strong>FROM: </strong>{`${msg["author"]["username"]}  |   ${msg["timestamp"]} `} {msg["attachments"].length > 0 && `| Attachments: ${attachmentLoop(msg["attachments"])}`}<input type="checkbox" value={msg['id']} name={msg['id']} ></input></div> </>
    })

    function back() {
        setMonitorOn(false)
    }

    return (
        <>
        {cookie.user &&
        <motion.main initial = "hiddenVariant" animate="revealedVariant" transition={{
            ease: "easeIn",
            type: "spring",
            staggerChildren: 1,
            duration: 0.7}}>  
            {!monitorOn &&
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
            }   
            <AnimatePresence>
            {showPopup && <motion.div variants={popup} initial= "initial" animate = "animate" exit= "exit" className="popupSuccess">{msg}</motion.div>}
            {showError && <motion.div variants={popup} initial= "initial" animate = "animate" exit= "exit" className="popupError">{msg}</motion.div>}
            </AnimatePresence>
            { monitorOn &&
            <motion.div variants={reveal}>
            <form method="post" onSubmit={handleSubmit}>
            <div><button className="monitor--back" onClick={back}>&#8249; Back </button></div>
            {!useAi && <div><textarea value={reply} onChange={handleChangeReply} placeholder="Enter your reply here"></textarea></div>}
            {useAi && <div><textarea value={prompt} onChange={handleChangePrompt} placeholder="Enter your AI message prompt here"></textarea></div>}
            {useAi && aiImage && <div><textarea value={imagePrompt} onChange={handleChangeImagePrompt} placeholder="Enter your AI Image prompt here"></textarea></div>}
            <input type="hidden" name="channel_id" value={channelData.channel_id}></input>
            <label className="slider--label"><Switch barBackgroundColorActive="#7785cc" onChange={() => setUseAi(!useAi)} checked={useAi}></Switch>Toggle AI Response</label>
            {useAi && <label className="slider--label"><Switch barBackgroundColorActive="#7785cc" onChange={() => setAiImage(!aiImage)} checked={aiImage}></Switch>Include AI image</label> }
            <div className="button--group">
            <button type="submit" className="reply--button" disabled={!sendingMsgs ? false : true}>{!sendingMsgs ? <p>Reply</p> : <BouncingCircles></BouncingCircles>}</button>
            <button type="button" className="reply--button" onClick={monitor}>Refresh</button>
            </div>
            <div className="messageBody">{messageDisplay}</div>
            </form>
            </motion.div>
            }   
        </motion.main> 
        }
        </>
    )
}