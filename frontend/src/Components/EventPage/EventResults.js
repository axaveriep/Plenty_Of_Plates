import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResultsCard from "../ResultsCard/ResultsCard";
import { eventTimeFormat, eventDateFormat } from '../CountDown/TimeFormatFunctions'
import CountdownTimer from "../CountDown/CountdownTimer";
import GuestLink from "../GuestForm/GuestLink";


function EventResults() {
    // let { eventId } = useParams();
    const location = useLocation();

    const [thisEvent, setThisEvent] = useState();
    const [results, setResults] = useState();
    const [qualified, setQualified] = useState();
    const [disqualified, setDisqualified] = useState();

    const [expired, setExpired] = useState(false);

    useEffect(() => {
        if (location.state !== undefined) {
            console.log(location.state);
            const { savedEvent } = location.state;
            setThisEvent(savedEvent);
        }
    }, []);

    useEffect(() => {
        if (thisEvent !== undefined) {
            let qualifiedResults = thisEvent.restaurantList.filter(restaurant => restaurant.downVotes === 0)
            let displayQualified = qualifiedResults.map((restaurant, i) => {
                return <ResultsCard key={i} restaurant={restaurant} />
            })
            setQualified(displayQualified);

            let disqualifiedResults = thisEvent.restaurantList.filter(restaurant => restaurant.downVotes > 0 )
            let displayDisqualified = disqualifiedResults.map((restaurant, i) => {
                return <ResultsCard key={i} restaurant={restaurant} />
            })
            setDisqualified(displayDisqualified);

        }
    }, [thisEvent]);

    return (
        <div>
            {thisEvent === undefined ? (
                <></>
            ) : (
                <div>
                    <h1>{thisEvent.title}</h1>
                    <h2>{eventDateFormat(thisEvent.time)} at {eventTimeFormat(thisEvent.time)}</h2>
                    {console.log(thisEvent.date)}
                    <CountdownTimer
                        targetdate={thisEvent.deadline}
                        handleExpired={setExpired}
                        isGuest={false}
                    />
                    {expired ? <>These are the final results!</> :
                        <div>
                            {console.log(thisEvent)}
                            {thisEvent.guestList.map((guest) => {
                                if (!guest.voted) {
                                    console.log(guest)
                                    return (
                                    <div>
                                        <GuestLink
                                        key={guest.guestId.guestId}
                                        guestName={guest.guestName}
                                        guestId={guest.guestId.guestId}
                                        eventId={thisEvent.eventId}
                                    />
                                    </div>)
                                }
                            })}
                        </div>}
                    <div>
                        <h1>Qualified</h1>
                        {qualified}
                        </div>
                    <div>
                        <h1>Disqualified</h1>
                        {disqualified}
                        </div>

                </div>
            )}
        </div>
    );
}

export default EventResults;
