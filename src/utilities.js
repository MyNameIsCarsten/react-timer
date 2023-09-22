export function getNewExpirationTime() {
    return Date.now() + 15 * 1000;
}

let nextId = 1;
export function generateId() {
    const result = nextId;
    nextId += 1;
    return result;
}

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

  export default formatTime
