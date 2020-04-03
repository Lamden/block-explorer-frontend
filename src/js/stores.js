import fetch from 'node-fetch';
import { writable } from 'svelte/store';

import { ApiURL } from './utils';


const createPriceInfo = () => {
    const PriceInfo = writable(null);
    fetch(`${ApiURL}/lamden/price`)
        .then(res => res.json())
        .then(res => PriceInfo.set(res))
    let subscribe = PriceInfo.subscribe;
    return {subscribe};
}
export const PriceInfo = createPriceInfo(null);


const createStampRatio = () => {
    const StampRatio = writable(0);
    fetch(`${ApiURL}/lamden/stamps`)
        .then(res => res.json())
        .then(res => StampRatio.set(res.value))
    let subscribe = StampRatio.subscribe;
    return {subscribe};
}
export const StampRatio = createStampRatio(0);



