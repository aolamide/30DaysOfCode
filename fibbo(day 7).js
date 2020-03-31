const fibbo = n => {
    //initialize with the first two number of the sequence
    let fibboMembers = [0,1];

    //run a loop up to n, while pushing new member to the sequence by adding the latest two members.
    //NB : loop won't run for n <=3.
    for(let i = 3; i <= n; i++){
        let topIndex = fibboMembers.length - 1
        fibboMembers.push(fibboMembers[topIndex] + fibboMembers[topIndex - 1]);
    }

    //return the desired member
    return fibboMembers[n -1];
}

console.log(fibbo(10)); //34
console.log(fibbo(8)); //13
console.log(fibbo(2)); //1
