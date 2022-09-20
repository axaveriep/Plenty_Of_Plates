import './Home.css'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import RestaurantGrid from '../RestaurantGrid/RestaurantGrid'
import { Button } from 'reactstrap'
import { getFavoritesByUserId } from '../SearchBar/SearchFunctions'


export default function Home(props) 
{
    const user = props.user;

    const [favorites, setFavorites] = useState(user.favorites)
    // const[favCount, setFavCount] = useState(0);

    // useEffect(() => {
    //     Promise.resolve(getFavoritesByUserId(user.id))
    //     .then(value => setFavorites(value))

    // }, [favCount])

    function addFavorite() {
        Promise.resolve(getFavoritesByUserId(user.id))
        .then(value => setFavorites(value))

        // setFavCount(prevFavCount => prevFavCount+1)
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div className='home-container'>
            <h1 className='welcome'>Welcome back {props.user.username}!</h1>
            <h5 className='motto'>Just pick a place!</h5>
            <div className='home-btnContainer'>
                <Button onClick={toggle}>Search Restaurants</Button>
                
                <Link to="/eventpage"> <Button>Create Event</Button> </Link>
                
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
