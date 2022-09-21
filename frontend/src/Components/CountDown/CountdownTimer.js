import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import useCountdown from './useCountdown';
import "./CountDown.css";
import { useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'reactstrap'

const ExpiredNotice = ({isGuest}) => {
  return (
    <div className="expired-notice">
      {isGuest ? <span>Oh no, it's too late!</span> : <></>}
      <p>The voting deadline has passed! Eat well and prosper!</p>
      {isGuest ? <Link to='/home'><Button>Home</Button></Link> : <></>}
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds, isGuest }) => {
  return (
    <div className="show-counter">
       You have <DateTimeDisplay value={days} type={'Days'} isDanger={false} />  :  <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} /> : <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} /> : <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} /> to just pick a place! <br />
       {isGuest ? <h3>Vote on where you'd like to go!</h3> : <></>}
    </div>
  );
};



const CountdownTimer = (props) => {


  console.log(props)

  const time = props.targetdate;

  
  let year = parseInt(time.substring(0,4));
  let month = parseInt(time.substring(5,7));
  let prosessedMonth = month -1;
  let day = parseInt(time.substring(8));
  let hour = 24;

  let finalDate = new Date(year,prosessedMonth,day,hour,);

  
  const [days, hours, minutes, seconds] = useCountdown(finalDate);
  

  if (days + hours + minutes + seconds <= 0) {

    props.handleExpired(true);

    return <ExpiredNotice isGuest={props.isGuest}/>;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        isGuest={props.isGuest}
      />
    );
  }
};

export default CountdownTimer;