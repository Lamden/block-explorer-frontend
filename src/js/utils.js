const validators = require('types-validate-assert')
const { validateTypes, assertTypes } = validators;
/*
    Validates an address if valid for a specific network/symbol
    Return: Trimmed String (str)
*/
const isLamdenKey = ( key ) => {
    if (validateTypes.isStringHex(key) && key.length === 64) return true;
    return false;
};

module.exports = {
    isLamdenKey, 
}