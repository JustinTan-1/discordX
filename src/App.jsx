import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Monitor from "./pages/Monitor.jsx"

export default function App() {
    return(
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path ="/home" element={<Home />} />
                <Route path ="/login" element={<Login />} />
                <Route path ="/register" element={<Register />} />
                <Route path ="/monitor" element={<Monitor />} />
            </Routes>
        </Router>
    )
}