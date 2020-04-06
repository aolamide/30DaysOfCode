const strinverter = str => {
    try{
        let number = Number(str);

        //throw error if number is NaN
        if(isNaN(number)) throw new Error('Error');

        return "Number " + number;
    }catch(err){
        return "Error"
    }
}

console.log(strinverter("7")); //Number 7
console.log(strinverter("[1, 2, 3]")) //Error
