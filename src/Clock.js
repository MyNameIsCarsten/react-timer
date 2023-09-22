import { useState, useEffect } from 'react';

const Clock = () => {
    // state for storing current time
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        // setInterval is used to create recurringly executed functions
        const interval = setInterval(() => {
          // update the clock state with a new Date object
          setClock(new Date()); //.toLocaleTimeString (will turn it to readable string)
          
        // the function above is executed each second (1000 milliseconds)
        }, 1000);
    
        // when ever the element is unmounted we clear the interval function up
        return () => {
          clearInterval(interval);
        };
      // useEffect is dependent on the clock state
      }, [clock]);
    
  return (
    <>
        <h1>
            {clock.toLocaleTimeString()} 
        </h1>
    </>
    
  )
}

export default Clock
