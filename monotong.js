const howManyVowels = str => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return str.toLowerCase().split('').filter(letter => vowels.includes(letter)).length;
}

console.log(howManyVowels('EducAtion'));