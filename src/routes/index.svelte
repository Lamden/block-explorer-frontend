<script context="module">
	//Utils
	import { formatValue } from '../js/utils'

	export async function preload(page, session) {
		const res = await this.fetch(`fetchAllData.json`)
		return await res.json()
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
	export let totalContracts;
	export let totalAddresses;

	const blockListItems = [
		{field: 'blockNum', title: 'Block', link: true, route: 'blocks'},
		{field: 'numOfSubBlocks', title: 'SubBlocks'},
		{field: 'numOfTransactions', title: 'Transactions'},
		{field: 'hash', title: 'Hash', flexgrow: true, shrink: true}
	]
	const txListItems = [
		{field: 'contractName', title: 'Contract'},
		{field: 'functionName', title: 'Function', hideMobile: true},
		{field: 'stampsUsed', title: 'Stamps Used'},
		{field: 'hash', title: 'Hash', link: true, route: 'transactions', shrink: true}
	]
	const topWalletsListItems = [
		{title: 'Rank'},
		{field: 'key', title: 'Address', link: true, route: 'addresses', shrink: true},
		{field: 'value', title: 'Amount', flexgrow: true},
	]

	onMount(() => {
		const timerID = setInterval(refreshPageData, 10000);

		return () => {
			clearInterval(timerID)
		}
	})

	const refreshPageData = async () => {
		let pageInfo =  await fetch(`fetchAllData.json`).then(res => res.json())
		if (blockList !== pageInfo.blockList) blockList = pageInfo.blockList
		if (txList !== pageInfo.txList) txList = pageInfo.txList
		if (topWalletsList !== pageInfo.topWalletsList) topWalletsList = pageInfo.topWalletsList
		if (totalContracts !== pageInfo.totalContracts) totalContracts = pageInfo.totalContracts
		if (totalAddresses !== pageInfo.totalAddresses) totalAddresses = pageInfo.totalAddresses		
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
	<TotalContractsBox {totalContracts}/>
	<TotalAddressesBox {totalAddresses} />
</div>

<InfoBox id="latest_blocks" title={'Latest Blocks'} info={blockList} itemList={blockListItems} route="blocks"/>
<InfoBox id="latest_transactions" title={'Latest Transactions'} info={txList} itemList={txListItems} route="transactions"/>
<InfoBox id="top_wallets" title={'Top Wallets'} info={topWalletsList} itemList={topWalletsListItems} route="addresses"/>