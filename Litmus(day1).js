const numberSigns = (a, b) => {
    //sign function to knoe if number is positive or negative
    let sign = num => num > 0 ? 'Positive' : num < 0 ? "Negative" : "Zero";
    let sign_a = sign(a);
    let sign_b = sign(b);
    //return signs
    return `The first number is ${sign_a } while the second number is ${sign_a  === sign_b ? 'also' : ''} ${sign_b}`;
}

console.log(numberSigns(0 , -7)) //The first number is Zero while the second number is Negstive
console.log(numberSigns(-9, -7)) //The first number is Negative while the second number is also Negstive
