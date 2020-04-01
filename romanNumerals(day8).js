//This program converts numbers from between 0 and 4000 to roman numerals
const toRoman = num => {
    //Define arrays for standard defined values (1000, 500, 200, etc) and edge cases (900, 400, 9, etc) with their roman numeral equivalent
    let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let roman = ['M', 'CM', 'D','CD','C','XC','L', 'XL','X', 'IX','V', 'IV', 'I'];
    
    let result = '';
    //while num > 0, run loops to check which highest decimal value in the array above can be taken from num, subtract this value from num and store its roman numeral equivalent in result
    if(num < 4000 && num > 0){
        while(num > 0) {
            for(let i = 0; i < decimal.length; i++){
                if(num >= decimal[i]){
                    result += roman [i];
                    num -= decimal[i];
                    break;
                }
            }
         }
         return result;
    }
    else return 'Enter number between 0 and 4000'; //if num is not between 0 and 4000, show this message
}

toRoman(390) //'CCCXC'
toRoman(519) //'DXIX'
