import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import useCountdown from './useCountdown';
import "./CountDown.css";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      
        <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
      
    </div>
  );
};

const CountdownTimer = (targetDate) => {

 console.log(typeof targetDate);
 console.log(targetDate);

  const time = targetDate.targetdate;

  console.log(typeof time);
  console.log(time);
  let year = parseInt(time.substring(0,4));
  let month = parseInt(time.substring(5,7));
  let prosessedMonth = month 
  let day = parseInt(time.substring(8,10));
  let hour = parseInt(time.substring(11,13));
  let minute = parseInt(time.substring(14, 16));
  let finalDate = new Date(year,8,day,hour,minute);
  let currentDate = new Date();
  let finalTime = finalDate.getTime();
  let currentTime = currentDate.getTime();
  console.log(finalTime)
  console.log(currentTime)
  let end = finalTime - currentTime;

  console.log(end);

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