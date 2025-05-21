import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Gif from "./pages/Register.jsx"
import Memes from "./pages/Memes.jsx"
import Home from "./pages/Home.jsx"

export default function App() {
    return(
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path ="/home" element={<Home />} />
                <Route path ="/meme" element={<Memes />} />
                <Route path ="/register" element={<Gif />} />
            </Routes>
        </Router>
    )
}