function generateRandomNumber() {
    let randomNumber = '';
    let length = 5
    for (var i = 0; i < length; i++) {
        var digit = Math.floor(Math.random() * 10);
        randomNumber += digit;
    }
    return randomNumber;
}

export default generateRandomNumber;