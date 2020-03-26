<script>
	import TotalContractsBox from '../components/TotalContractsBox.svelte'
	import TotalAddressesBox from '../components/TotalAddressesBox.svelte'
	import TauPriceBox from '../components/TauPriceBox.svelte'
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