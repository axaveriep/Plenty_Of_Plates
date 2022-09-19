import './Home.css'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import RestaurantGrid from '../RestaurantGrid/RestaurantGrid'
import { Button } from 'reactstrap'


export default function Home(props) 
{
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div className='home-container'>
            <h1 className='welcome'>Welcome back {props.username}!</h1>
            <h5 className='motto'>Just pick a place!</h5>
            <div className='home-btnContainer'>
                <Button onClick={toggle}>Search Restaurants</Button>
                
                <Link to="/eventpage"> <Button>Create Event</Button> </Link>
                
                <RestaurantGrid 
                    hideAddBtn={true} 
                    modal={modal} 
                    toggle={toggle}
                />
            </div>
        </div>
    )
};
