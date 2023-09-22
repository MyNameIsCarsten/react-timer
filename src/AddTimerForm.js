import { generateId } from "./utilities";

const AddTimmerForm = (props) => {

  // event handler function (submit)
  const handleSubmit = (e) => {
    // prevent page from reloading
    e.preventDefault();

    // pick up timerName field value
    let timerName = e.target.timerName.value;
    if (timerName === ''){
      timerName = 'New Timer';
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
    let timerLen = timerSec * 1000 + timerMin * 60000 + timerHou * 3600000;

    // create future timeStamp (now + timer settings) in milliseconds
    let timerStamp = Date.now() + timerLen;

    

    // create new timer object
    const newTimer = {
      id:generateId(),
      timerName: timerName,
      timerSec: timerSec,
      timerMin: timerMin,
      timerHou: timerHou,
      timerStamp: timerStamp,
      timerLen: timerLen
    }

    // add new timer object with function that was passed in as prop
    props.addTimer(newTimer);

    // reset Timer name field in form after submission
    e.target.timerName.value = '';
  }

  return (
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
  )
}

export default AddTimmerForm
