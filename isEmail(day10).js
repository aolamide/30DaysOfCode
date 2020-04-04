const isEmail = arg => /\S+@\S+\.\S+/.test(arg);

isEmail('olamide@heyey.com')   //true
isEmail('notemmail@notemail') //false
