import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"

export default function App() {
    return(
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path ="/home" element={<Home />} />
                <Route path ="/login" element={<Login />} />
                <Route path ="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}