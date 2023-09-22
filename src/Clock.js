import { useState, useEffect } from 'react';
import formatTime from './utilities';

const Clock = () => {
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
          setClock(new Date());
          
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
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
