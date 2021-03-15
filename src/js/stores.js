import { writable } from 'svelte/store';

export const PriceInfo = writable(0.00);
export const StampRatio = writable(0);
export const NetworkSymbol = writable("");
export const tabHidden = writable(false);
export const topWallets = writable(null);



