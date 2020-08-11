<script context="module">
	//Utils
	import { formatValue } from '../js/utils'

	const fetchAllData = async (http, networkSymbol = undefined) => {
		let allInfo = await Promise.all([
			http(`tauPrice.json`).then(res => res.json()),
			http(`stampRatio.json`).then(res => res.json())
		])
		return {
			tauPrice: allInfo[0],
			stampRatio: allInfo[1].value,
			networkSymbol
		}
	}

	export async function preload(page, session) {
		return await fetchAllData(this.fetch, session.networkSymbol)
	}
</script>

<script>
	import { onMount } from 'svelte'

	//Stores
	import { PriceInfo, StampRatio, NetworkSymbol } from '../js/stores'

	//Components
	import Nav from '../components/Nav.svelte';

	export let tauPrice;
	export let stampRatio;
	export let segment;
	export let networkSymbol;

	PriceInfo.set(tauPrice);
	StampRatio.set(stampRatio);
	NetworkSymbol.set(networkSymbol);
	
	onMount(() => {
		const timerID = setInterval(refreshStoreData, 60000);

		return () => {
			clearInterval(timerID)
		}
	})

	const refreshStoreData = async () => {
		let info =  await fetchAllData(fetch)
		if (info.tauPrice !== $PriceInfo) PriceInfo.set(info.tauPrice);
		if (info.stampRatio !== $StampRatio) StampRatio.set(info.stampRatio);
	}
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>