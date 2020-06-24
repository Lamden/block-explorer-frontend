<script context="module">
	//Utils
	import { ApiURL, formatValue } from '../js/utils'

	export async function preload(page, session) {
		let pageInfo =  await Promise.all([
			this.fetch(`${ApiURL}/blocks?limit=10`).then(res => res.json()).then(res => res.data),
			this.fetch(`${ApiURL}/transactions/?limit=10`).then(res => res.json()).then(res => res.data),
			this.fetch(`${ApiURL}/states/topwallets/?limit=20`).then(res => res.json()).then(res => res.data)
		])
		return {
			blockList: pageInfo[0],
			txList: pageInfo[1],
			topWalletsList: pageInfo[2]
		}
	}
</script>

<script>
	import { onMount } from 'svelte'

	//Components
	import TotalContractsBox from '../components/TotalContractsBox.svelte'
	import TotalAddressesBox from '../components/TotalAddressesBox.svelte'
	import TauPriceBox from '../components/TauPriceBox.svelte'
	import InfoBox from '../components/InfoBox.svelte'

	//Utils
	import { isLamdenKey } from '../js/utils'

	export let blockList;
	export let txList;
	export let topWalletsList;

	let refreshData;

	const blockListItems = [
		{field: 'blockNum', title: 'Block', link: true, route: 'block'},
		{field: 'numOfSubBlocks', title: 'SubBlocks'},
		{field: 'numOfTransactions', title: 'Transactions'},
		{field: 'hash', title: 'Hash', flexgrow: true, shrink: true}
	]
	const txListItems = [
		{field: 'contractName', title: 'Contract'},
		{field: 'functionName', title: 'Function', hideMobile: true},
		{field: 'stampsUsed', title: 'Stamps Used'},
		{field: 'hash', title: 'Hash', link: true, route: 'transaction', shrink: true}
	]
	const topWalletsListItems = [
		{title: 'Rank'},
		{field: 'key', title: 'Address', link: true, route: 'address', shrink: true},
		{field: 'value', title: 'Amount', flexgrow: true},
	]

	onMount(() => {
		refreshData = setInterval(() => {
			refreshAllData()
		}, 60000);

		return () => {
			clearInterval(refreshData)
		}

		console.log(formatValue(10))
	})

	const refreshAllData = async () => {
		let pageInfo =  await Promise.all([
			fetch(`${ApiURL}/blocks?limit=10`).then(res => res.json()).then(res => res.data),
			fetch(`${ApiURL}/transactions/?limit=10`).then(res => res.json()).then(res => res.data),
			fetch(`${ApiURL}/states/topwallets/?limit=20`).then(res => res.json()).then(res => res.data)
		])
		blockList = pageInfo[0]
		txList = pageInfo[1]
		topWalletsList = pageInfo[2]
	}
</script>

<style>
	a{
		display: inline;
	}
	p{
		max-width: 444px;
		margin-top: 0;
	}
	.hero-rec{
		box-sizing: border-box;
		margin-top: 3rem;
		padding: 40px 0;
		border-radius: 4px;
		margin-bottom: 18px;
		background-image: url('../../img/hero_bg.jpeg');
		background-position-x: 47%;
		background-size: cover;
		background-repeat: no-repeat;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
</style>

<svelte:head>
	<title>Lamden Testnet Explorer</title>
</svelte:head>

<h1>Block Explorer</h1>
<p class="text-body-1 font-primary-dark">{`Built on the Lamden ecosystem to display all the blockchain information. Looking to transact or send a smart contract?`}
    <a class="outside-link" href="https://chrome.google.com/webstore/detail/lamden-wallet-browser-ext/fhfffofbcgbjjojdnpcfompojdjjhdim" target="_blank" rel="noreferrer noopener">{`Download the Wallet`}</a>
	{` or `}
	<a class="outside-link" href="https://www.lamden.io" target="_blank" rel="noreferrer noopener">{`visit our website`}</a>
</p>

<div class="flex-row hero-rec">
	<TauPriceBox />
	<TotalContractsBox />
	<TotalAddressesBox />
</div>

<InfoBox id="latest_blocks" title={'Latest Blocks'} info={blockList} itemList={blockListItems} route="block"/>
<InfoBox id="latest_transactions" title={'Latest Transactions'} info={txList} itemList={txListItems} route="transaction"/>
<InfoBox id="top_wallets" title={'Top Wallets'} info={topWalletsList} itemList={topWalletsListItems} route="address"/>