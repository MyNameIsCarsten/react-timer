import { useState, useEffect } from 'react';
import { generateId } from "./utilities";

const AddTimmerForm = (props) => {
  const[timer, setTimer] = useState('');

  const handleNameChange = (e) => {
    setTimer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let timerName = e.target.timerName.value;
    let timerSec = parseInt(e.target.seconds.value, 10);
    if (isNaN(timerSec)) {
      timerSec = 0;
    } 
    timerSec = timerSec < 10 ? '0' + timerSec : timerSec;

    let timerMin = parseInt(e.target.minutes.value, 10);
    if (isNaN(timerMin)) {
      timerMin = 0;
    } 
    timerMin = timerMin < 10 ? '0' + timerMin : timerMin;

    let timerHou = parseInt(e.target.hours.value, 10);
    if (isNaN(timerHou)) {
      timerHou = 0;
    } 
    timerHou = timerHou < 10 ? '0' + timerHou : timerHou;

    let timerStamp = Date.now() + timerSec * 1000 + timerMin * 60000 + timerHou * 3600000;
    const newTimer = {
      id:generateId(),
      timerName: timerName,
      timerSec: timerSec,
      timerMin: timerMin,
      timerHou: timerHou,
      timerStamp: timerStamp,
    }

    props.addTimer(newTimer);
    setTimer("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="timerName">Name of timer:</label>
      <input placeholder='New Timer' type="text" id="timerName" name="timerName" onChange={handleNameChange} className='form-control'/>
      <label htmlFor="seconds">Seconds:</label>
      <select id="seconds" name="seconds" className='form-select w-25 text-center m-2'>
        {Array.from({ length: 60 }, (_, index) => {
          const value = index.toString().padStart(2, '0'); // Convert to two-digit format
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>


      <label htmlFor="minutes">Minutes:</label>
      <select id="minutes" name="minutes" className='form-select w-25 text-center m-2'>
        {Array.from({ length: 60 }, (_, index) => {
          const value = index.toString().padStart(2, '0'); // Convert to two-digit format
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>

      <label htmlFor="hours">Hours:</label>
      <select id="hours" name="hours" className='form-select w-25 text-center m-2'>
        {Array.from({ length: 60 }, (_, index) => {
          const value = index.toString().padStart(2, '0'); // Convert to two-digit format
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
      <input type="submit" value="Add Timer" className='btn btn-success rounded-pill px-3 m-2'/>
    </form>
  )
}

export default AddTimmerForm
