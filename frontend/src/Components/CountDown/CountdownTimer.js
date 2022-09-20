import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import useCountdown from './useCountdown';
import "./CountDown.css";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Your event has expired! Eat well and prosper!</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
        <DateTimeDisplay value={days} type={'Days'} isDanger={false} />  :  <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} /> : <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} /> : <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
    </div>
  );
};

const CountdownTimer = (targetDate) => {

  

  const time = targetDate.targetdate;

  
  let year = parseInt(time.substring(0,4));
  let month = parseInt(time.substring(5,7));
  let prosessedMonth = month -1;
  let day = parseInt(time.substring(8));
  let hour = 24;

  let finalDate = new Date(year,prosessedMonth,day,hour,);

  
  const [days, hours, minutes, seconds] = useCountdown(finalDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;