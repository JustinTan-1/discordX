import react from "react"

export default function Meme() {
    return (
        <main>
            <form className="form">
                <input type="text"
                className="form--input" placeholder="Top Text"/>
                <input type="text"
                className="form--input"
                placeholder="Bottom Text"/>
                <button className="form--button">Generate Meme</button>
            </form>
        </main>
    )
}