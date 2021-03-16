<script context="module">
	//stores
	import { NetworkSymbol } from '../js/stores'
	//Utils
	import { formatValue } from '../js/utils'

	export async function preload(page, session) {
		const res = await this.fetch('fetchStartingData.json?' + 
			`txAmount=${session.whitelabel.mainpage.latestTransactions.rows}` + '&' +
			`blocksAmount=${session.whitelabel.mainpage.blocks.rows}`
			)
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
	import InfoBoxLoading from '../components/InfoBox-Loading.svelte'

	//Utils
	import { isLamdenKey } from '../js/utils'
	import whitelabel from '../js/whitelabel'
	import { tabHidden, topWallets } from '../js/stores'

	export let blockList;
	export let txList;
	export let totalContracts;
	export let totalAddresses;

	$: networkType = $NetworkSymbol === 'TAU' ? 'Mainnet' : 'Testnet'

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
		{field: 'value', title: 'Amount', flexgrow: true, toFixed: whitelabel.mainpage.topWallets.columns.amount.toFixed, prefix: whitelabel.mainpage.topWallets.columns.amount.prefix},
	]

	onMount(() => {
		getTopWallets()
		const timerID = setInterval(refreshPageData, 30000);
		return () => {
			clearInterval(timerID)
		}
	})

	const getTopWallets = async () => {
		let topWalletsRes = await fetch(`topWallets.json`).then(res => res.json())
		topWallets.set(topWalletsRes)
	}

	async function refreshPageData(){
		if (!$tabHidden){
			let pageInfo =  await fetch('fetchAllData.json?' + 
				`txAmount=${whitelabel.mainpage.latestTransactions.rows}` + '&' +
				`blocksAmount=${whitelabel.mainpage.blocks.rows}`
				)
				.then(res => res.json())
			if (blockList !== pageInfo.blockList) blockList = pageInfo.blockList
			if (txList !== pageInfo.txList) txList = pageInfo.txList
			if ($topWallets !== pageInfo.topWalletsList) topWallets.set(pageInfo.topWalletsList)
			if (totalContracts !== pageInfo.totalContracts) totalContracts = pageInfo.totalContracts
			if (totalAddresses !== pageInfo.totalAddresses) totalAddresses = pageInfo.totalAddresses
		}
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
	<title>Lamden {networkType} Explorer</title>
</svelte:head>

<h1>{whitelabel.mainpage.title}</h1>
{#if whitelabel.mainpage.subtitle.show} 
	<p class="text-body-1">
		{#if whitelabel.mainpage.subtitle.message === "lamden_default"}
			<span class="font-secondary">{`Built on the Lamden ecosystem to display all the blockchain information. Looking to transact or send a smart contract?`}</span>
			<a class="outside-link" href="https://chrome.google.com/webstore/detail/lamden-wallet-browser-ext/fhfffofbcgbjjojdnpcfompojdjjhdim" target="_blank" rel="noreferrer noopener">{`Download the Wallet`}</a>
			<span class="font-secondary">{` or `}</span>
			<a class="outside-link" href="https://www.lamden.io" target="_blank" rel="noreferrer noopener">{`visit our website`}</a>
		{:else}
			<span class="font-secondary">{whitelabel.mainpage.subtitle.message}</span>
		{/if}
	</p>
{/if}


{#if whitelabel.mainpage.detailsBox.show}
	<div class="flex-row hero-rec">
		{#if whitelabel.mainpage.detailsBox.items.showPriceInfo}<TauPriceBox />{/if}
		{#if whitelabel.mainpage.detailsBox.items.showSmartContractCount}<TotalContractsBox {totalContracts}/>{/if}
		{#if whitelabel.mainpage.detailsBox.items.showTransactionCount}<TotalAddressesBox {totalAddresses} />{/if}
	</div>
{/if}

{#if whitelabel.mainpage.blocks.show}
	<InfoBox id="latest_blocks" title={'Latest Blocks'} info={blockList} itemList={blockListItems} route="blocks"/>
{/if}
{#if whitelabel.mainpage.latestTransactions.show}
	<InfoBox id="latest_transactions" title={'Latest Transactions'} info={txList} itemList={txListItems} route="transactions"/>
{/if}

{#if $topWallets}
	<InfoBox id="top_wallets" title={'Top Wallets'} info={$topWallets} itemList={topWalletsListItems} route="addresses"/>
{:else}
	<InfoBoxLoading id="top_wallets" title={'Top Wallets'} numOfRows={20} itemList={topWalletsListItems} route="addresses"/>
{/if}

