import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ResultsCard from "../ResultsCard/ResultsCard";
import { getEventByEventId } from "../SearchBar/SearchFunctions";

function EventResults() {
  // let { eventId } = useParams();
  const location = useLocation();

  const [thisEvent, setThisEvent] = useState();
  const [results, setResults] = useState();

  useEffect(() => {
    if (location.state !== undefined) {
      console.log(location.state);
      const { savedEvent } = location.state;
      setThisEvent(savedEvent);
    }
  }, []);

  useEffect(() => {
    if (thisEvent !== undefined) {
      let displayResultCards = thisEvent.restaurantList.map((restaurant) => {
        return <ResultsCard restaurant={restaurant} />;
      });
      setResults(displayResultCards);
    }
  },[thisEvent]);

  return (
    <div>
      {thisEvent === undefined ? (
        <></>
      ) : (
        <div>
          <h1>{thisEvent.eventId}</h1>
          <h2>{thisEvent.title}</h2>
          {results}
        </div>
      )}
    </div>
  );
}

export default EventResults;
