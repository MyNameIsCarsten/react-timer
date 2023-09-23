import { generateId } from "./utilities";
import './addtimerform.css'
import { useState } from 'react';

const AddTimmerForm = (props) => {
  const [activeTab, setActiveTab] = useState('timer'); // Initialize the active tab state

  // event handler function (submit)
  const handleSubmit = (e) => {
    // prevent page from reloading
    e.preventDefault();

    // pick up timerName field value
    let timerName = e.target.timerName.value;
    if (timerName === ''){
      if (activeTab === 'alarm'){
        timerName = 'New Alarm';
      } else {
        timerName = 'New Timer';
      }
      
    }

    // pick up seconds field value
    let timerSec = parseInt(e.target.seconds.value, 10);
    if (isNaN(timerSec)) {
      timerSec = 0;
    } 
    timerSec = timerSec < 10 ? '0' + timerSec : timerSec;

    // pick up minutes field value
    let timerMin = parseInt(e.target.minutes.value, 10);
    if (isNaN(timerMin)) {
      timerMin = 0;
    } 
    timerMin = timerMin < 10 ? '0' + timerMin : timerMin;

    // pick up hours field value
    let timerHou = parseInt(e.target.hours.value, 10);
    if (isNaN(timerHou)) {
      timerHou = 0;
    } 
    timerHou = timerHou < 10 ? '0' + timerHou : timerHou;

    // define timer length
    let timerLen = 0;

    // define timer length
    let timerType = '';

    // check form which tab the submit came
    if (activeTab === 'alarm'){

      // create new date object
      let alarm = new Date();
      // Define hours, minutes and seconds for this Data object
      alarm.setHours(timerHou, timerMin, timerSec);
      // Convert alarm to milliseconds based on epoch
      alarm.valueOf();

      // Get epoch value of current time
      const now = Date.now().valueOf();

      // Calculate differents between now and alarm
      const alarmDiff = alarm - now

      // create future timeStamp (now + timer settings) in milliseconds
      timerLen = alarmDiff;

      timerType = 'alarm';


    // when timer infos are coming from timer tab
    } else {
      // define timer length
      timerLen = timerSec * 1000 + timerMin * 60000 + timerHou * 3600000;

      timerType = 'timer';

    }
    
    // create future timeStamp (now + timer settings) in milliseconds
    let timerStamp = Date.now() + timerLen;

    if (timerStamp < Date.now()){
      alert('Please enter an Alarm in the future.')
    } else {
      // create new timer object
      const newTimer = {
        id:generateId(),
        timerName: timerName,
        timerSec: timerSec,
        timerMin: timerMin,
        timerHou: timerHou,
        timerStamp: timerStamp,
        timerLen: timerLen,
        timerType: timerType
      }

      // add new timer object with function that was passed in as prop
      props.addTimer(newTimer);

      // reset Timer name field in form after submission
      e.target.timerName.value = '';

    }

    
  }


  return (
    <>
      <div className="d-flex justify-content-center add-border">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'timer' ? 'active' : ''}`}
              onClick={() => setActiveTab('timer')} // Set active tab to 'timer'
            >
              Timer
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'alarm' ? 'active' : ''}`}
              onClick={() => setActiveTab('alarm')} // Set active tab to 'alarm'
            >
              Alarm
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content" id="myTabContent">
        <div
          className={`tab-pane fade ${activeTab === 'timer' ? 'show active' : ''}`}
          id="timer"
          role="tabpanel"
          aria-labelledby="timer-tab"
        >
            <form onSubmit={handleSubmit}>
              <label htmlFor="timerName">Name of timer:</label>
              <input placeholder='New Timer' type="text" id="timerName" name="timerName" className='form-control rounded-pill w-50'/>
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
              <input type="submit" value="Start Timer" className='btn btn-success rounded-pill px-3 m-2'/>
            </form>
          </div>
          <div
          className={`tab-pane fade ${activeTab === 'alarm' ? 'show active' : ''}`}
          id="alarm"
          role="tabpanel"
          aria-labelledby="alarm-tab"
        >
            <form onSubmit={handleSubmit}>
              <label htmlFor="timerName">Name of alarm:</label>
              <input placeholder='New Alarm' type="text" id="timerName" name="timerName" className='form-control rounded-pill w-50'/>
              
              <div className="alarm-wrapper">
                <div>
                <label htmlFor="hours">Hours:</label>
                  <select id="hours" name="hours" className='form-select text-center m-2'>
                    {Array.from({ length: 60 }, (_, index) => {
                      const value = index.toString().padStart(2, '0'); // Convert to two-digit format
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label htmlFor="minutes">Minutes:</label>
                  <select id="minutes" name="minutes" className='form-select text-center m-2'>
                    {Array.from({ length: 60 }, (_, index) => {
                      const value = index.toString().padStart(2, '0'); // Convert to two-digit format
                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  
                  <label htmlFor="seconds">Seconds:</label>
                    <select id="seconds" name="seconds" className='form-select text-center m-2'>
                      {Array.from({ length: 60 }, (_, index) => {
                        const value = index.toString().padStart(2, '0'); // Convert to two-digit format
                        return (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                </div>
              </div>
              <input type="submit" value="Start Alarm" className='btn btn-success rounded-pill px-3 m-2'/>
            </form>
          </div>
      </div>
      
  </>
  )
}

export default AddTimmerForm
