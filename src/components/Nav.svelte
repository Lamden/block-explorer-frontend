<script>
	//Components
	import InputBox from './InputBox.svelte'

	//Images
	import lamdenLogo from '../../static/img/lamden_logo_new.svg'
	import lamdenWords from '../../static/img/lamden_words.svg'
	import navBurger from '../../static/img/icons/nav-burger.svg'
	import menuClose from '../../static/img/icons/menu-close.svg'

	//Utils
	import { isLamdenKey } from '../js/utils'
	import { StampRatio, NetworkSymbol } from '../js/stores'

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
		color: var(--font-accent);
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
	.nav-logo > span:last-child{
		margin-left: 15.53px;
	}
	.input-box{
		width: 100%;
		max-width: 600px;
		margin: 1rem 20px 1rem 0;
	}
	.tau-details{
		margin-top: 5px;
		min-width: max-content;
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
	}

</style>

{#if !menuOpen}
<nav class="flex-row">
	<div class="flex-column logo-box">
		<div class="flex-row nav-logo" on:click={() => {navigate("/")}}>
			<span>{@html lamdenLogo}</span>
			<span>{@html lamdenWords}</span>
		</div>
		<div class="tau-details text-subtitle-1 font-primary-dark">
			{` 1 ${$NetworkSymbol} = ${$StampRatio} stamps`}
		</div>
	</div>
	<div class="flex-row input-box">
		<InputBox
			id="seach"
			value={""}
			on:keyup={handleKeyUp}
			on:iconClick={handleIconClick}
			borderColor={notFound ? "red" : undefined}
			label={'Search Lamden Blockchain'}
			placeholder={"Block # / Tx Hash / Address"}
			styles="min-width: max-content;"
			width={'100%'}
			icon={'find'}
			
		/>
	</div>
	<ul class="flex-row text-nav">
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='blocks'>Blocks</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='transactions'>Transactions</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='addresses'>Wallets</a></li>
	</ul>
</nav>
{/if}

{#if menuOpen}
	<div class="menu flex-column">
		<div class="logo-box">
			<div class="flex-row nav-logo menu-logo" on:click={() => {navigate("/")}}>
				<span>{@html lamdenLogo}</span>
				<span>{@html lamdenWords}</span>
			</div>
		</div>
		<ul class="flex-column">
			<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='/' on:click={toggleMenu}>Home</a></li>
			<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='blocks' on:click={toggleMenu}>Blocks</a></li>
			<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='transactions' on:click={toggleMenu}>Transactions</a></li>
			<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='addresses' on:click={toggleMenu}>Wallets</a></li>
			<!--<li><a class="text-menu" aria-current='{segment === "about" ? "page" : undefined}' href='about' on:click={toggleMenu}>About</a></li>-->
		</ul>
	</div>
{/if}

<div class="nav-burger" on:click={toggleMenu}> 
	{#if menuOpen}
		{@html menuClose}
	{:else}
		{@html navBurger}
	{/if}
</div>