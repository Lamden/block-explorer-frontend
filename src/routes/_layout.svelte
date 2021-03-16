<script context="module">
	//Utils
	import { formatValue } from '../js/utils'

	import whitelabel from '../js/whitelabel'

	const fetchAllData = async (http, whitelabel) => {
		let allInfo = await Promise.all([
			whitelabel.mainpage.detailsBox.items.showPriceInfo ? http(`tauPrice.json`).then(res => res.json()) : 0,
			whitelabel.nav.showStampRatio ? http(`stampRatio.json`).then(res => res.json()).then(json => json.value) : 0
		])
		return {
			tauPrice: allInfo[0],
			stampRatio: allInfo[1],
			networkSymbol: whitelabel.networkSymbol
		}
	}

	export async function preload(page, session) {
		return await fetchAllData(this.fetch, session.whitelabel)
	}
</script>

<script>
	import { onMount } from 'svelte'

	//Stores
	import { PriceInfo, StampRatio, NetworkSymbol, tabHidden, topWallets  } from '../js/stores'

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

		document.addEventListener("visibilitychange", setTabActive);
		return () => {
			document.removeEventListener("visibilitychange", setTabActive);
		}

		return () => {
			clearInterval(timerID)
		}
	})

	const setTabActive = () => {
		tabHidden.set(document.hidden)
		refreshStoreData()
	}

	const refreshStoreData = async () => {
		if (!$tabHidden){
			let tauPrice =  await fetch('tauPrice.json').then(res => res.json())
			if (tauPrice !== $PriceInfo) PriceInfo.set(tauPrice);
		}
	}
</script>

<style>
	main {
		position: relative;
		max-width: 75em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>