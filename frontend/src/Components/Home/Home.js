import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import RestaurantGrid from '../RestaurantGrid/RestaurantGrid'
import { getFavoritesByUserId } from '../SearchBar/SearchFunctions'
import './Home.css'


export default function Home(props) 
{
    const user = props.user;
    
    const [favorites, setFavorites] = useState(user.favorites)
    const[favCount, setFavCount] = useState(0);

    useEffect(() => {
        if(user.id !== null){
        Promise.resolve(getFavoritesByUserId(user.id))
        .then(value => setFavorites(value))}

    }, [favCount,user.id])//react was whining about needing user.id

    function addFavorite() {
        setFavCount(prevFavCount => prevFavCount+1)
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div className='home-container'>
            <h1 className='welcome'>Welcome back {props.user.username}!</h1>
            <h5 className='motto'>Just pick a place!</h5>
            <div className='home-btnContainer'>
                <button className="home--searchbtn" onClick={toggle}>Search Restaurants</button>
                
                <button className='home--createbtn'><Link to="/eventpage">Create Event</Link></button> 
                
                <RestaurantGrid 
                    hideAddBtn={true} 
                    modal={modal} 
                    toggle={toggle}
                    addFavorite={addFavorite}
                    favorites={favorites}
                />
            </div>
        </div>
    )
};
