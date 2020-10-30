<script>
	//Components
	import InputBox from './InputBox.svelte'

	//Images
	import logo from '../../static/logo_full.svg'

	//Utils
	import { isLamdenKey } from '../js/utils'
	import { StampRatio, NetworkSymbol } from '../js/stores'
	import whitelabel from '../js/whitelabel'

	//Props
	export let segment;

	let menuOpen = false;
	let notFound = false;

	const toggleMenu = () => {
		menuOpen = !menuOpen;
	}
	
	const navigate = (route) => {
		window.location.href = route
	}

	const handleKeyUp = (e) => {
		if(e.detail.keyCode === 13){
			determineRoute(e.detail.target.value)
		}
	}

	const handleIconClick = (e) => {
		determineRoute(e.detail)
	}

	const determineRoute = async (value) => {
		if (typeof value === 'string') value = value.trim()
		if (value === "") return

		notFound = false;

		if (isLamdenKey(value) ){
			let addressResponse  = await fetch(`addresses/addressBalance.json?address=${value}`).then(res => res.json())
			if (addressResponse.value) {
				navigate(`addresses/${value}`)
				return
			}

			let txResponse  = await fetch(`transactions/transaction.json?hash=${value}`).then(res => res.json())
			if (txResponse.tx) {
				console.log("transaction")
				navigate(`transactions/${value}`)
				return
			}
			
			let blockHashResponse  = await fetch(`blocks/blockHash.json?hash=${value}`).then(res => res.json())
			if (blockHashResponse) {
				console.log("block")
				navigate(`blocks/${blockHashResponse.blockNum}`)
				return
			}
		
		}else{
			let blockNumResponse  = await fetch(`blocks/block.json?blockNum=${value}`).then(res => res.json())
			if (blockNumResponse.block) {
				navigate(`blocks/${value}`)
				return
			}
		}
		notFound = true;
	}

</script>

<style>
	nav {
		z-index: 50;
		border-bottom: 1px solid var(--divider-color);
		padding: 20px 2em;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	ul{
		list-style-type: none;
		padding: 0;
	}
	ul.flex-row{
		display: none;
	}
	ul.flex-column{
		list-style-type: none;
		align-items: center;
	}
	li {
		display: block;
	}
	a{
		text-decoration: none;
		display: block;
	}
	a:link{
		color: var(--font-primary);
	}
	a:visited{
		color: var(--font-primary);
	}
	a:hover{
		color: var(--accent-color);
	}

	a.text-menu {
		padding: 1em 0;
		display: block;
	}

	.logo-box {
		margin: 1rem 50px 1rem 0;
		justify-content: center;
		align-items: flex-end;
	}
	.nav-logo{
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.input-box{
		width: 100%;
		max-width: 600px;
		margin: 1rem 20px 1rem 0;
	}
	.tau-details{
		margin-top: 5px;
		width: 100%;
	}
	.nav-burger{
		z-index: 150;
		position: absolute;
		right: 2em;
		top: 40px;
	}

	.menu{
		box-sizing: border-box;
		z-index: 100;
		background-color: var(--bg-color);
		position: fixed;
		padding: 20px 2em;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		justify-content: flex-start;
	}
	.menu-logo{
		justify-content: flex-start;
	}
	.burger-icon{
		fill: var(--primary-color)
	}

	@media (min-width: 800px) {
		nav{
			flex-wrap: nowrap;
			flex-direction: row;
			padding: 0 37px;
			height: 110px;
			align-items: center;
		}
		ul.flex-row {
			display: flex;
			justify-content: flex-end;
			min-width: min-content;
			margin: 0 0 0 50px;
			margin: 1rem 0;
		}
		ul.flex-row > li > a {
			padding: 1em 0.5em;
		}
		.nav-burger{
			display: none;
		}
		.tau-details{
			text-align: center;
		}
	}

</style>

{#if !menuOpen}
<nav class="flex-row">
	<div class="flex-column logo-box">
		<div class="flex-row nav-logo" on:click={() => {navigate("/")}}>
			<span>{@html logo}</span>
		</div>
		{#if whitelabel.nav.showStampRatio}
			<div class="tau-details text-subtitle-1 font-secondary">
				{` 1 ${$NetworkSymbol} = ${$StampRatio} stamps`}
			</div>
		{/if}
	</div>
	<div class="flex-row input-box">
		<InputBox
			id="seach"
			value={""}
			on:keyup={handleKeyUp}
			on:iconClick={handleIconClick}
			borderColor={notFound ? "red" : undefined}
			label={whitelabel.nav.searchBoxLabel}
			placeholder={whitelabel.nav.searchBoxPlaceholder}
			styles="min-width: max-content;"
			width={'100%'}
			icon={'find'}
			
		/>
	</div>
	<ul class="flex-row text-nav">
		{#if whitelabel.nav.blocks}
			<li><a aria-current='{segment === "about" ? "page" : undefined}' href='blocks'>Blocks</a></li>
		{/if}
		{#if whitelabel.nav.transactions}
			<li><a aria-current='{segment === "about" ? "page" : undefined}' href='transactions'>Transactions</a></li>
		{/if}
		{#if whitelabel.nav.wallets}
			<li><a aria-current='{segment === "about" ? "page" : undefined}' href='addresses'>Wallets</a></li>
		{/if}
	</ul>
</nav>
{/if}

{#if menuOpen}
	<div class="menu flex-column">
		<div class="logo-box">
			<div class="flex-row nav-logo menu-logo" on:click={() => {navigate("/")}}>
				{@html logo}
			</div>
		</div>
		<ul class="flex-column">
			<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='/' on:click={toggleMenu}>Home</a></li>
			{#if whitelabel.nav.blocks}
				<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='blocks' on:click={toggleMenu}>Blocks</a></li>
			{/if}
			{#if whitelabel.nav.transactions}
				<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='transactions' on:click={toggleMenu}>Transactions</a></li>
			{/if}
			{#if whitelabel.nav.wallets}
				<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='addresses' on:click={toggleMenu}>Wallets</a></li>
			{/if}
			<!--<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='about' on:click={toggleMenu}>About</a></li>-->
		</ul>
	</div>
{/if}

<div class="nav-burger" on:click={toggleMenu}> 
	{#if menuOpen}
		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path class="burger-icon" d="M17.5 1.7625L15.7375 0L8.75 6.9875L1.7625 0L0 1.7625L6.9875 8.75L0 15.7375L1.7625 17.5L8.75 10.5125L15.7375 17.5L17.5 15.7375L10.5125 8.75L17.5 1.7625Z" fill="white"/>
		</svg>
	{:else}
		<svg width="27" height="18" viewBox="0 0 27 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path class="burger-icon" d="M0 0H26.25V2.91667H0V0ZM0 7.29167H26.25V10.2083H0V7.29167ZM0 14.5833H26.25V17.5H0V14.5833Z" fill="white"/>
		</svg>
	{/if}
</div>