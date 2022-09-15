import React from 'react'
import { useParams } from 'react-router-dom'

function VotingPage() {

    let {eventId, guestId} = useParams();

  return (
    <div>VotingPage</div>
  )
}

export default VotingPage