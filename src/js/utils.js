const validators = require('types-validate-assert')
const { validateTypes } = validators;
const Lamden = require('lamden-js')
const { Encoder } = Lamden;

const isLamdenKey = ( key ) => {
    if (validateTypes.isStringHex(key) && key.length === 64) return true;
    return false;
};

function isNumber(n) {
    return Object.prototype.toString.call(n) !== '[object Array]' &&!isNaN(parseFloat(n)) && isFinite(n);
}

const displayNumber = (value, toFixed = 0) => {
    if (!value) return '0'
    if (!Encoder.BigNumber.isBigNumber(value)) value = Encoder('bigNumber', value)
    let v =  Encoder('bigNumber', value.toFixed(toFixed))
    return v.toFormat({  decimalSeparator: '.', groupSeparator: ',', groupSize: 3})
}

const formatValue = ( value, toFixed = 0 ) => {
    if (typeof value === 'undefined' || value == null) return "NULL"
    if (value.__fixed__) return displayNumber(value.__fixed__, toFixed)
    if (isNumber(value)){
        return parseFloat(value).toLocaleString()
    }else{
        if (validateTypes.isString(value)) return value
        else return JSON.stringify(value)
    }
}

module.exports = {
    isLamdenKey,
    formatValue
}