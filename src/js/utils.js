const validators = require('types-validate-assert')
const { validateTypes, assertTypes } = validators;
/*
    Validates an address if valid for a specific network/symbol
    Return: Trimmed String (str)
*/
//const ApiURL = 'https://explorer.lamden.io/api/'
const ApiURL = 'http://localhost:1337'
const isLamdenKey = ( key ) => {
    if (validateTypes.isStringHex(key) && key.length === 64) return true;
    return false;
};

module.exports = {
    isLamdenKey,
    ApiURL
}