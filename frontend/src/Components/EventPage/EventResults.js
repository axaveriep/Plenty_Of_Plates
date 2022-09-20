import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { getEventByEventId } from '../SearchBar/SearchFunctions';

function EventResults() {

    // let { eventId } = useParams();
    const location = useLocation();
    
    const [thisEvent, setThisEvent] = useState()

    useEffect(() => {
        if(location.state !==undefined) {
            console.log(location.state)
            const { savedEvent } = location.state
            setThisEvent(savedEvent)
        }
    },[])
    


    return (
        <div>
           {thisEvent === undefined ? <></> :
           <div>
                <h1>{thisEvent.eventId}</h1>
                <h2>{thisEvent.title}</h2>
            </div>}
        </div>
    )
}

export default EventResults