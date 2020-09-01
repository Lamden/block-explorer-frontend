const validators = require('types-validate-assert')
const { validateTypes } = validators;

const isLamdenKey = ( key ) => {
    if (validateTypes.isStringHex(key) && key.length === 64) return true;
    return false;
};

function isNumber(n) {
    return Object.prototype.toString.call(n) !== '[object Array]' &&!isNaN(parseFloat(n)) && isFinite(n);
  }

const formatValue = ( value ) => {
    if (typeof value === 'undefined' || value == null) return "NULL"
    if (isNumber(value)){
        return parseFloat(value).toLocaleString()
    }else{
        if (value.__fixed__) return parseFloat(value.__fixed__).toLocaleString()
        if (validateTypes.isString(value)) return value
        else return JSON.stringify(value)
    }
}

module.exports = {
    isLamdenKey,
    formatValue
}