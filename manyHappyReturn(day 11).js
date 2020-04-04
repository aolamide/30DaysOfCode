let daysTillNextBirthday = DOB => {
    DOB = new Date(DOB);
    DOB.setHours(0, 0, 0, 0);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    today = today.getTime(); //get today's 0:0:0AM  in milliseconds
    let thisYear = new Date().getFullYear();
    let birthDay = DOB.getDate();
    let birthMonth = DOB.getMonth() + 1; //add 1 since month starts from zero
    let nextBirthday = new Date(`${birthMonth}-${birthDay}-${thisYear}`).getTime(); //get the milliseonds of this year's birthday
    
    //if this year's birthday has passed, get the milliseconds of next year
    if(today >= nextBirthday) nextBirthday = new Date(`${birthMonth}-${birthDay}-${thisYear + 1}`).getTime();
    
    //get difference in milliseconds between today and next birthday
    let difference = nextBirthday - today;
    
    //convert to days
    let nextBirthdayInDays = difference / (1000 * 60 * 60 * 24);
    return nextBirthdayInDays + 'days';
}
