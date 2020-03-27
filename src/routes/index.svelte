<script>
	import { onMount } from 'svelte'

	//Components
	import TotalContractsBox from '../components/TotalContractsBox.svelte'
	import TotalAddressesBox from '../components/TotalAddressesBox.svelte'
	import TauPriceBox from '../components/TauPriceBox.svelte'
	import InfoBox from '../components/InfoBox.svelte'

	$: blockList = [];
	$: txList = [];
	const blockListItems = [
		{field: 'blockNum', title: 'Block', link: true},
		{field: 'numOfSubBlocks', title: '#of SubBlocks'},
		{field: 'numOfTransactions', title: '#of Transactions'},
		{field: 'hash', title: 'Hash'}
	]
	const txListItems = [
		{field: 'contractName', title: 'Contract'},
		{field: 'functionName', title: 'Function'},
		{field: 'stampsUsed', title: 'Stamps Used'},
		{field: 'hash', title: 'Hash'}
	]


	onMount(async () => {
		blockList = await fetch('http://localhost:1337/blocks/5').then(res => res.json())
		txList = await fetch('http://localhost:1337/transactions/5').then(res => res.json())
	})

</script>

<style>
	a{
		display: inline;
	}
	p{
		width: 444px;
		margin-top: 0;
	}
	.hero-rec{
		box-sizing: border-box;
		margin-top: 3rem;
		padding: 40px 0;
		border-radius: 4px;
		margin-bottom: 18px;
		background-image: url('../../img/hero_bg.png');
		background-position-x: 47%;
		background-size: cover;
		background-repeat: no-repeat;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}
	@media (min-width: 480px) {

	}
</style>

<svelte:head>
	<title>Lamden Testnet Explorer</title>
</svelte:head>

<h1>Block Explorer</h1>
<p class="text-body-1 font-primary-dark">{`Built on the Lamden ecosystem to display all the blockchain information. Looking to transact or send a smart contract?`}
    <a class="outside-link" href="www.lamden.io" target="_blank" rel="noreferrer noopener">{`Download the Wallet`}</a>
	{` or `}
	<a class="outside-link" href="www.lamden.io" target="_blank" rel="noreferrer noopener">{`visit our website`}</a> {` to learn more.`}</p>

<div class="flex-row hero-rec">
	<TauPriceBox />
	<TotalContractsBox />
	<TotalAddressesBox />
</div>

<InfoBox title={'Latest Blocks'} info={blockList} itemList={blockListItems}/>
<InfoBox title={'Latest Transactions'} info={txList} itemList={txListItems}/>