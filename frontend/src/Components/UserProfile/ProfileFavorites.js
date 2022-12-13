import React, { useState, useEffect } from 'react'
import { getFavoritesByUserId } from '../SearchBar/SearchFunctions'
import RestaurantThumbnail from '../RestaurantCard/RestaurantThumbnail'
import ProfileSidebar from './ProfileSidebar'
import "./UserProfile.css"


function ProfileFavorites(props) {

    const username = props.user.username
    const userId = props.user.id;

    const [favoriteData, setFavoriteData] = useState()
    const [favoriteThumbnails, setFavoriteThumbnails] = useState()
    const [favCount, setFavCount] = useState(0);

    function updateFavorites() {
        setFavCount(prevFavCount => prevFavCount + 1)
    }

    useEffect(() => {
        /** retrieves current information from database 
         * resets when database information is changed like user
         * deleting a favorite
        */
        Promise
            .resolve(getFavoritesByUserId(userId))
            .then(value => setFavoriteData(value))

    }, [userId, favCount])

    useEffect(() => {
        if (favoriteData !== undefined) {
            /** displays user favorites, can be deleted */
            let displayFavThumbnails = favoriteData.map((userFav, i) => {
                const restaurant = {
                    id: userFav.favoriteId.restaurantId,
                    name: userFav.restaurantName,
                    image_url: userFav.imageUrl
                }
                if (userFav.favorite) {
                    return <RestaurantThumbnail
                        key={i}
                        restaurant={restaurant}
                        showFavBtn={true}
                        userId={userId}
                        updateFavorites={updateFavorites}
                    />
                }
                return undefined;//react was whining about needing return at the end
            })
            setFavoriteThumbnails(displayFavThumbnails)
        }


    }, [favoriteData, userId])//react was whining about needing userId

    return (
        <div className='profileContainer'>
            <ProfileSidebar username={username} page={'favorites'}/>
            <div title='Profile' className='profile'>
                <div className='profile--array-container'>
                    <h2>Favorites</h2>
                    <div md={6} className='profile--events'>
                        {favoriteThumbnails}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileFavorites