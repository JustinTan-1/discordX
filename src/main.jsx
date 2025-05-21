import App from './App.jsx'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')).render(
    <CookiesProvider>
        <App />
    </CookiesProvider>
)
