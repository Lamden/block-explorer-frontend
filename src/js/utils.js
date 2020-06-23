const validators = require('types-validate-assert')
const { validateTypes } = validators;

//const ApiURL = 'https://explorer.lamden.io/api'
const ApiURL = 'http://localhost:1337'
const networkSymbol = 'dTAU'

const isLamdenKey = ( key ) => {
    if (validateTypes.isStringHex(key) && key.length === 64) return true;
    return false;
};

const formatValue = ( value ) => {
    if (typeof value === 'undefined' || value == null) return "NULL"
    if (isNaN(value)){
        if (validateTypes.isString(value)) return value
        else return JSON.stringify(value)
    }else{
        return parseFloat(value).toLocaleString()
    }
}

module.exports = {
    isLamdenKey,
    ApiURL,
    networkSymbol,
    formatValue
}