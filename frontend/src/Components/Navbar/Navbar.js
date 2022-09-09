import './Navbar.css'
import { Link } from 'react-router-dom'


export default function Navbar(props) {
    return (
        <nav className="nav">
            {/*I messed up the title layout in the navbar by adding the logo, couldn't figure out how to fix at the moment */}
            <img className='logo' src='plates_favicon.ico' alt='stacked plates'/>
            <Link to='/home' className="site-title">Plenty Of Plates</Link>
            <ul>
                <li>
                    <Link to='/home'>Home</Link>
                </li>

                <li>
                <Link to='/userprofile'>Profile</Link>
                </li>

                <li>
                    <Link to='/login' onClick={props.handleLogout}>Logout</Link>
                </li>
            </ul>
        </nav>
    )
}