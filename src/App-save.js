import './App.css';
import { useState, useEffect } from 'react';

const formatTime = (t) => {
  let tempTime = t;

  // const milliseconds = tempTime % 1000;
  tempTime = Math.floor(tempTime / 1000);

  let seconds = tempTime % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  tempTime = Math.floor(tempTime / 60);

  let minutes = tempTime % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  tempTime = Math.floor(tempTime / 60);

  let hours  = tempTime % 60;
  hours = hours < 10 ? '0' + hours : hours;

  return hours + ':' + minutes + ':' + seconds;
}

function App() {
  const [time, setTime] = useState(Date.now());
  const [startTime, setStartTime] = useState(Date.now());
  const [futureTime, setFutureTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(Date.now());
  const [secDiff, setSecDiff] = useState(0);
  const [minDiff, setMinDiff] = useState(0);
  const [hourDiff, setHourDiff] = useState(0);
  const [timer, setTimer] = useState(false);
  const [timerArray, setTimerArray] = useState(['Test']);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
      
      if (timer && futureTime > time) {
        const remainingTime = futureTime - time;
        setTimeLeft(formatTime(remainingTime));
      } else if (timer) {
        // Timer has reached zero, so setTimer to false and clear the interval
        setTimer(false);
        setTimeLeft('00:00:00')
        clearInterval(interval);
        alert('Time is up');
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time, timer, futureTime]);

  

  const handleReset = () => {
    setStartTime(Date.now());
  }

  const handleSecondsChange = (e) => {
    setSecDiff(e.target.value);
  }

  const handleMinuteChange = (e) => {
    setMinDiff(e.target.value);
  }

  const handleHourChange = (e) => {
    setHourDiff(e.target.value);
  }

  const handleNameChange = (e) => {
    console.log(e.target.value)
  }

  const handleStart = () => {
    setFutureTime(Date.now() + secDiff * 1000 + minDiff * 60000 + hourDiff * 3600000);
    setTimeLeft(formatTime(futureTime - time));
    setTimer(true);

    addTimer('Hello')
  }

  const addTimer = (newTimer) =>{
    setTimerArray((prevTimers) => [...prevTimers, newTimer])
  }


  return (
    <div className="App">
      <p>Now: {formatTime(time)}</p>
      <p>Time Left: {timeLeft !== startTime ? timeLeft : '00:00:00'}</p>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleStart}>Start</button>
      <form>
        <label htmlFor="timerName">Name of timer:</label>
        <input type="text" id="timerName" name="timerName" defaultValue="" onChange={handleNameChange} />
        <label htmlFor="seconds">Seconds:</label>
        <input type="number" id="seconds" name="seconds" min="0" max="59" defaultValue="0" onChange={handleSecondsChange} />
        <label htmlFor="minutes">Minutes:</label>
        <input type="number" id="minutes" name="minutes" min="0" max="59" defaultValue="0" onChange={handleMinuteChange} />
        <label htmlFor="hours">Hours:</label>
        <input type="number" id="hours" name="hours" min="0" max="23" defaultValue="0" onChange={handleHourChange} />
    </form>
      <p>Current timers:</p>
      {timerArray.map(t =><p>{t}</p>)}
    </div>
  );
}

export default App;
