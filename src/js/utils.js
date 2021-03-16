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

const toBigNumber = (value, toFixed = undefined) => {
    try{
        let bn = Encoder('bigNumber', value)
        if (bn.isNaN()) return false
        if (toFixed) return Encoder('bigNumber', bn.toFixed(toFixed))
        return bn
    }catch(e){
        return false
    }
}
    
const isBigNumber = (value) => Encoder.BigNumber.isBigNumber(value)

const displayNumber = (value, toFixed = 0) => {
    if (!value) return '0'
    if (!isBigNumber(value)) value = toBigNumber(value, toFixed)
    if (value) return stringToFixed(value.toFormat(toFixed, {  decimalSeparator: '.', groupSeparator: ',', groupSize: 3}), toFixed)
    else return '0'
}

const formatValue = ( value, toFixed = undefined ) => {
    if (typeof value === 'undefined' || value == null) return "NULL"
    if (value.__fixed__) return displayNumber(value.__fixed__, toFixed)
    try{
        let bigNumberVal = toBigNumber(value, toFixed)
        if (bigNumberVal) return displayNumber(bigNumberVal, toFixed)
    }catch (e){}
    if (isNumber(value)){
        return parseFloat(value).toLocaleString()
    }else{
        if (validateTypes.isString(value)) return value
        else return JSON.stringify(value)
    }
}

const stringToFixed = (value, precision) => {
	if (isBigNumber(value) && precision ) value = value.toFixed(precision)
	if (!value) return "0.0"
		try {
			var values = value.split('.')
		} catch {
			var values = value.toString().split('.')
		}
		if (!values[1]) return value
		else {
			if (values[1].length < precision) precision = values[1].length
				let decValue = parseInt(values[1].substring(0, precision))
			if (decValue === 0) return `${values[0]}`
			else {
				let decimals = values[1].substring(0, precision)
				for (let i = precision - 1; i >= 0; i--) {
					if (decimals[i] === '0') precision -= 1
					else i = -1
			}
			return `${values[0]}.${values[1].substring(0, precision)}`
		}
	}
}

module.exports = {
    isLamdenKey,
    formatValue,
    stringToFixed
}