import react from "react"
import troll from "../assets/troll.png"
import { Link } from "react-router-dom"

export default function() {
    return( 
        <div className = "header">
            <img src = {troll} className="header--img"/>
            <Link to="/" className = "header--text">Meme Generator</Link>
            <Link to="/meme" className = "header--link">Static Memes</Link>
            <Link to="/gif" className = "header--link">Gifs</Link>
        </div>
    )
}