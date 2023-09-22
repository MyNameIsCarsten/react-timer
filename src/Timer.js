import React, { useState, useEffect } from 'react';
import './timer.css'

const Timer = (props) => {
  const { timer, removeTimer } = props;
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(timer));
  const [timerState, setTimerState] = useState('active');

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateRemainingTime(timer);
      setRemainingTime(newRemainingTime);

      if (newRemainingTime <= 0) {
        clearInterval(interval);
        setTimerState('expired');
        // removeTimer(timer.id);
        // alert(`${timer.timerName} has expired!`)
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, removeTimer]);

  function calculateRemainingTime(timer) {
    const currentTime = Date.now();
    return Math.max(0, timer.timerStamp - currentTime);
  }

  function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000) < 10 ? '0' + Math.floor(milliseconds / 3600000) : Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000) < 10 ? '0' + Math.floor((milliseconds % 3600000) / 60000) : Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000) < 10 ? '0' + Math.floor((milliseconds % 60000) / 1000) : Math.floor((milliseconds % 60000) / 1000);
  return `${hours}:${minutes}:${seconds}`;
  }

  const handleRemoveClick = () => {
    removeTimer(timer.id);
  };

  const classNamesLi = `timer-list list-group-item ${timerState === 'expired' ? 'bg-danger' : ''}`;
  const classNamesBtn = `remove-button btn rounded-pill px-3 ${timerState === 'expired' ? 'btn-light' : 'btn-danger'}`

  return (
    <li className={classNamesLi} key={timer.id} style={timerState === 'expired' ? { color: 'white' } : {}}>
      <strong>{timer.timerName}: </strong><span>{formatTime(remainingTime)}</span>
      <button
        className={classNamesBtn}
        onClick={handleRemoveClick}
      >
        &times;
      </button>
    </li>
  );
}

export default Timer;
