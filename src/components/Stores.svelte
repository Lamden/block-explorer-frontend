<script context="module">
import { writable, get } from 'svelte/store';
import { ApiURL } from '../js/utils';
import fetch from 'node-fetch';

const createPriceInfo = (startValue) => {
    const PriceInfo = writable(startValue);
    fetch(`${ApiURL}/lamden/price`)
        .then(res => res.json())
        .then(res => PriceInfo.set(res))
    let subscribe = PriceInfo.subscribe;
    return {subscribe};
}

export const PriceInfo = createPriceInfo(null);
</script>



