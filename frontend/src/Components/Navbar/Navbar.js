import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'


export default function PopNavbar(props) {



    return (
        <nav className="nav">

            <Link to='/home' className="site-title"><img className='logo' src='plates_favicon.ico' alt='stacked plates' /> Plenty of Plates</Link>
            <ul>
                <li>
                    <Link to='/home'>Home</Link>
                </li>

                <li>
                    <Link to={`/user/${props.username}`}>Profile</Link>
                </li>

                <li>
                    <Link to='/login' onClick={props.handleLogout}>Logout</Link>
                </li>
            </ul>
        </nav>
    )
}