import './Navbar.css'
import { Link } from 'react-router-dom'



export default function Navbar(props) {
    return (
        <nav className="nav">
            <a href="/" className="site-title">Plenty Of Plates</a>
            <ul>
                <li><Link to='/home'>Home</Link></li>
                <li>
                    <a href="profile">Profile</a>
                </li>
                <li>
                    <Link to='/login' onClick={props.handleLogout}>Logout</Link>
                </li>
            </ul>
        </nav>

    )
}