const phoneNumberValid = (phoneNumber) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
}

const removeNonDigitCharacters = (phoneNumber) => {
    return phoneNumber.replace(/\D/g, '');
}

module.exports = {
    phoneNumberValid,
    removeNonDigitCharacters
};
