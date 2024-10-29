import react from "react"
import troll from "../assets/troll.png"

export default function() {
    return( 
        <div className = "header">
            <img src = {troll} className="header--img"/>
            <h1 className = "header--text">Meme Generator</h1>
        </div>
    )
}