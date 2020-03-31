onst dayTime = () => {
    //put days in array so as to access through it's ondex
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const date = new Date(); //declare date object
    //get day, hour, hour, minute and seconds
    const day = date.getDay(), 
          hour = date.getHours(), 
          minute = date.getMinutes(), 
          seconds = date.getSeconds();

    //return current day and time
    let result = `Today is ${days[day]}\nCurrent time is ${hour < 12 ? hour : hour % 12}:${minute}:${seconds}${hour >= 12 ? 'PM' : 'AM'}`
    return result;
}

console.log(dayTime());
