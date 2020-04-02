const isError = argument => {
    //check if argument is an instance of the Error class
    if(argument instanceof Error) return 'Error';
    return 'Argument is not an error'
}
