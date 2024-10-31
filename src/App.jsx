import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Gif from "./pages/Gif.jsx"
import Memes from "./pages/Memes.jsx"
import Home from "./pages/Home.jsx"

export default function App() {
    return(
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path ="/home" element={<Home />} />
                <Route path ="/meme" element={<Memes />} />
                <Route path ="/gif" element={<Gif />} />
            </Routes>
        </Router>
    )
}