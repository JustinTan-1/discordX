import react from "react"

export default function Meme() {
    return (
        <main>
            <form className="form">
                <label> Top Text
                <input type="text"
                className="form--input" placeholder="When you discover"/>
                </label>
                <label> Bottom Text
                <input type="text"
                className="form--input"
                placeholder="Meme Generator"/>
                </label>
                <button className="form--button">Generate Meme</button>
            </form>
        </main>
    )
}