import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { useState } from 'react'
import './Navbar.css'


export default function PopNavbar(props) {

    const [menu, setMenu] = useState(false)

    const showMenu = () => setMenu(!menu)

    return (
        <nav className="nav">

            <Link to='/home' className="site-title"><img className='logo' src='plates_favicon.ico' alt='stacked plates' /> Plenty of Plates</Link>
            <div className={menu ? 'nav-menu active' : 'nav-menu hide'}>
                <ul className='nav-menu-items'>
                    <li className='nav-menu-text'>
                        <Link to='/home'>Home</Link>
                    </li>

                    <li className='nav-menu-text'>
                        <Link to={`/user/${props.username}/events`}>Profile</Link>
                    </li>

                    <li className='nav-menu-text'>
                        <Link to='/login' onClick={props.handleLogout}>Logout</Link>
                    </li>
                </ul>
            </div>
            <div onClick={showMenu} className='nav-menu-bars'>
                    <FaIcons.FaBars />
            </div>
        </nav>
    )
}