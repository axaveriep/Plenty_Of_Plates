import './Navbar..css'



export default function Navbar() {
    return ( 
    <nav className="nav">
        <a href="/" className="site-title">Plenty Of Plates</a>
        <ul>
            <li>
            <a href="home">Home</a>
            </li>
            <li>
            <a href="profile">Profile</a>
            </li>
            <li>
            <a href="logout">Logout</a>
            </li>
        </ul>
    </nav>

    )
}