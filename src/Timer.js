import React, { useState, useEffect } from 'react';
import './timer.css'

const Timer = (props) => {
  const { timer, removeTimer, updateTimerArray  } = props;
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(timer));
  const [timerState, setTimerState] = useState('active');

  useEffect(() => {
    // setInterval is used to create recurringly executed functions
    const interval = setInterval(() => {
      // calculate remaining time for the timer
      const newRemainingTime = calculateRemainingTime(timer);
      // update the remainingTime state
      setRemainingTime(newRemainingTime);

      // if the state is less or equal to 0 (time is up)
      if (newRemainingTime <= 0) {
        // clear the interval function
        clearInterval(interval);
        // update the timerState state to 'expired'
        setTimerState('expired');
        // removeTimer(timer.id);
        // alert(`${timer.timerName} has expired!`)
      }
    // the function above is executed each second (1000 milliseconds)
    }, 1000);

    // when ever the element is unmounted we clear the interval function up
    return () => {
      clearInterval(interval);
    };

  // useEffect is dependent on the timer state
  }, [timer]);

  // function to calculate remaining time based on difference to current time
  function calculateRemainingTime(timer) {
    const currentTime = Date.now();
    // ensure that we never return a negative number
    return Math.max(0, timer.timerStamp - currentTime);
  }

  // function to format a milliseconds input (output of Date.now())
  function formatTime(milliseconds) {
    // convert number to hours and format it to have preceeding 0 if it is smaler than 10
    const hours = Math.floor(milliseconds / 3600000) < 10 ? '0' + Math.floor(milliseconds / 3600000) : Math.floor(milliseconds / 3600000);
    // convert number to minutes and format it to have preceeding 0 if it is smaler than 10
    const minutes = Math.floor((milliseconds % 3600000) / 60000) < 10 ? '0' + Math.floor((milliseconds % 3600000) / 60000) : Math.floor((milliseconds % 3600000) / 60000);
    // convert number to seconds and format it to have preceeding 0 if it is smaler than 10
    const seconds = Math.floor((milliseconds % 60000) / 1000) < 10 ? '0' + Math.floor((milliseconds % 60000) / 1000) : Math.floor((milliseconds % 60000) / 1000);
    // return all three in a beautiful time format: HH:MM:SS
    return `${hours}:${minutes}:${seconds}`;
  }

  // whenever the button is clicked
  const handleRemoveClick = () => {
    // the specific timer is removed (removeTimer was passed as prop)
    removeTimer(timer.id);
    setTimerState('active');
  };

  const handleResetClick = () => {
    // Calculate the new timerStamp based on the current time and the initial timer length
    const currentTime = Date.now();

    // define new value for the time stamp of the timer (when it will expire)
    const newTimerStamp = currentTime + timer.timerLen;
  
    // Update the timer's properties
    updateTimerArray((prevTimers) =>
        // Go through each timer
        prevTimers.map((prevTimer) =>
          // for the timer if the same id we update timeStamp
          prevTimer.id === timer.id ? { ...prevTimer, timerStamp: newTimerStamp } : prevTimer
        )
      );
  
    // Reset the remaining time
    setRemainingTime(timer.timerLen);
    // Reset the timer state to 'active'
    setTimerState('active');
  };
  

  // workaround to update the classes of li and button items with boostrap styles depending on timerState
  const classNamesLi = `timer-list list-group-item ${timerState === 'expired' ? 'bg-danger' : ''}`;
  const classNamesBtnRemove = `remove-button btn rounded-pill px-3 ${timerState === 'expired' ? 'btn-light' : 'btn-danger'}`


  return (
    <li className={classNamesLi} key={timer.id} style={timerState === 'expired' ? { color: 'white' } : {}}>
      <strong>{timer.timerName}: </strong><span>{formatTime(remainingTime)}</span>
      
      <button
        className={classNamesBtnRemove}
        onClick={handleRemoveClick}
      >
        &times;
      </button>

      {timerState === 'expired' && timer.timerType === 'timer' ? <span>{formatTime(timer.timerLen)}</span> : ''}
      {timer.timerType === 'timer' ? 
        <button
          className='btn rounded-pill px-3 btn-warning'
          onClick={handleResetClick}
        >
          &#8634;
        </button> 
          : 
        ''}
      {timer.timerType === 'alarm' && timerState === 'expired' ? 'Ended: ' + timer.timerHou +':' + timer.timerMin +':' + timer.timerSec : ''}

    </li>
  );
}

export default Timer;
