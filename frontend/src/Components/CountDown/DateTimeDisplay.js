import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    // <div className={isDanger ? 'countdown danger' : 'countdown'}>
    //   <p>{value}</p>
    //   <span>{type}</span>
    // </div>
    <span className={isDanger ? 'countdown danger' : 'countdown'}>
      {value} {type}
    </span>
  );
};

export default DateTimeDisplay;