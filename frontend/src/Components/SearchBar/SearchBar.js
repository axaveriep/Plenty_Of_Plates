import React, { useState } from 'react'
import { searchRestaurantsByLocation } from './SearchFunctions'
import './SearchBar.css'

export default function SearchBar(props) {
    const [input, setInput] = useState({ location: '', term: '' })

    const handleChange = (event) => {
        setInput({...input, [event.target.name]: event.target.value})
    }

    const handleKeyDown = (event) => {
        console.log(event.target.value)
        if (event.key === 'Enter') {
            handleSearch(input)
        }
    }


    const handleSearch = (searchTerm) => {
        console.log(searchTerm)
        props.addRestaurants(searchRestaurantsByLocation(searchTerm))
    }

    return (
        <div className="search">
            <input
                type="text"
                name='location'
                placeholder={props.location_placeholder}
                value={input.location}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <input
                type='text'
                name='term'
                placeholder={props.term_placeholder}
                value={input.term}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button className="search--button" onClick={() => handleSearch(input)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </button>
        </div>
    )
};
