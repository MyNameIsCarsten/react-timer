import './App.css';
import { useState } from 'react';
import AddTimmerForm from './AddTimerForm';
import Clock from './Clock';
import Timer from './Timer';



function App() {
  // state for storing timers
  const[timerArray, setTimerArray] = useState([]);

  // function to add a timer to timerArray state
  const addTimer = (timer) => {
    setTimerArray((prevTimer) => [...prevTimer, timer]);
  };

  // function to remove a timer from timerArray state
  const removeTimer = (timerIdToRemove) => {
    setTimerArray((prevTimmer) => prevTimmer.filter(t => t.id !== timerIdToRemove)
    );
  };


  return (
    <div className="App dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px">
      <Clock />
      <AddTimmerForm addTimer={addTimer}/>
      <ul className='list-group'>{timerArray.map((t)=> 
        <Timer timer={t} removeTimer={removeTimer}/>)}
      </ul>
    </div>
  );
}

export default App;
