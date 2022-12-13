import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResultsCard from "../ResultsCard/ResultsCard";
import { eventTimeFormat, eventDateFormat } from '../CountDown/TimeFormatFunctions'
import CountdownTimer from "../CountDown/CountdownTimer";
import GuestLink from "../GuestForm/GuestLink";
import "./EventResults.css"
import ProfileSidebar from "../UserProfile/ProfileSidebar";


export default function EventResults(props) {
    const location = useLocation();

    const [thisEvent, setThisEvent] = useState();
    const [qualified, setQualified] = useState();
    const [disqualified, setDisqualified] = useState();

    const [expired, setExpired] = useState(false);

    /** the event data is pulled directly from a paramater when linked to this page, showing event details */
    useEffect(() => {
        if (location.state !== undefined) {
            console.log(location.state);
            const { savedEvent } = location.state;
            setThisEvent(savedEvent);
        }
    }, [location.state]);//react was whining about needing location.state


    /** the event data also has the guest and restaurant information which we use to display the content
     * of the page as soon as the data is retrived      */
    useEffect(() => {
        if (thisEvent !== undefined) {

            let qualifiedResults = thisEvent.restaurantList.filter(restaurant => restaurant.downVotes === 0)
            let displayQualified = qualifiedResults.map((restaurant, i) => {
                return <ResultsCard key={i} restaurant={restaurant} />
            })
            setQualified(displayQualified);

            /** restaurants that receive 'No' votes are disqualified */
            let disqualifiedResults = thisEvent.restaurantList.filter(restaurant => restaurant.downVotes > 0)
            let displayDisqualified = disqualifiedResults.map((restaurant, i) => {
                return <ResultsCard key={i} restaurant={restaurant} />
            })
            setDisqualified(displayDisqualified);

            /** check if all guests have voted */
            let voteCount = 0;
            thisEvent.guestList.forEach(guest => {
                if(guest.voted) {
                    voteCount++
                }    
            });

            if (voteCount === thisEvent.guestList.length) {
                setExpired(true)
            }

        }
    }, [thisEvent]);

    return (
        <div className="event-results-container">
            <ProfileSidebar 
            username={props.user.username}
            />
            {thisEvent === undefined ? (<></>)
                :
                (
                    <div className='event-results-content'>
                        <div className="event-results-header-container">
                            <h1 className="event-results-title">{thisEvent.title}</h1>
                            <h2>{eventDateFormat(thisEvent.time)} at {eventTimeFormat(thisEvent.time)}</h2>
                            {console.log(thisEvent.date)}
                            <CountdownTimer
                                targetdate={thisEvent.deadline}
                                handleExpired={setExpired}
                                isGuest={false}
                            />
                             {/** if the deadline has not passed and there are guests who still have not voted
                         * custom links are redisplayed
                         */}
                        {expired ? <div className="event-results-final-text side">These are the final results!</div> :
                            <div className="event--confirmed-selectedGuests side">
                                <div className='event--confirmed-selectedGuests-header'>Resend Invitations</div>
                                {thisEvent.guestList.map((guest) => {
                                    if (!guest.voted) {
                                        return (
                                            
                                                <GuestLink
                                                    key={guest.guestId.guestId}
                                                    guestName={guest.guestName}
                                                    guestId={guest.guestId.guestId}
                                                    eventId={thisEvent.eventId}
                                                />
                                            )
                                    }
                                    return undefined;
                                })}
                            </div>}
                        </div>
                       <div className='event-results-restaurants'>
                        <div className="event-results-qualified">
                            <h1>Qualified</h1>
                            <div className="qualified--container">
                                {qualified}
                            </div>
                        </div>
                        <div className="event-results-disqualified">
                            <h1>Disqualified</h1>
                            <div className="disqualified--container">
                                {disqualified}
                            </div>
                        </div>
                        </div>
                    </div>
                )}
        </div>
    );
};
