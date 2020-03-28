<script>
	//Components
	import InputBox from './InputBox.svelte'

	//Images
	import lamdenLogo from '../../static/img/lamden_logo_new.svg'
	import lamdenWords from '../../static/img/lamden_words.svg'

	//Props
	export let segment;
	
	const navigate = () => {
		window.location.href = "/"
	}

</script>

<style>
	nav {
		border-bottom: 1px solid var(--divider-color);
		padding: 20px 40px;
		align-items: center;
		flex-wrap: wrap;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	ul {
		display: none;
	}

	li {
		display: block;
		float: left;
	}

	a {
		font-family: 'Avenir-Light';
		font-style: normal;
		font-weight: normal;
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
		font-size: 16px;
		line-height: 24px;
		color: var(--font-primary-dark);
		letter-spacing: 0.44px;
	}

	.logo-box {
		margin: 1rem 50px 1rem 0;
		justify-content: center;
		align-items: center;
	}

	.nav-logo{
		height: 30px;
		align-items: center;
		cursor: pointer;
	}
	.nav-logo> span:last-child{
		margin-left: 15.53px;
	}
	.input-box{
		flex-grow: 1;
		width: 100%;
		margin: 1rem 20px 1rem 0;
	}
	.tau-details{
		margin-top: 5px;
		min-width: max-content;
	}
	@media (min-width: 800px) {
	nav{
		flex-wrap: nowrap;
		flex-direction: row;
		padding: 0 37px;
		height: 110px;
		align-items: center;
	}
	ul {

		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin: 0 0 0 50px;
		padding: 0;
		margin: 1rem 0;
	}
}

</style>

<nav class="flex-row">
	<div class="logo-box">
		<div class="flex-row nav-logo" on:click={navigate}>
			<span>{@html lamdenLogo}</span>
			<span>{@html lamdenWords}</span>
		</div>
		<div class="tau-details text-subtitle-1 font-primary-dark">
			{`TAU: $0.15   Stamps: 10 TAU ($0.10)`}
		</div>
	</div>

	<div class="flex-row input-box">
		<InputBox
			value={""}
			label={'Search'}
			placeholder={"Block / Hash / Address"}
			styles="min-width: max-content;"
			width={'100%'}
			icon={'find'}
		/>
	</div>
	<ul>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='block'>Blocks</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='transaction'>Transactions</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='address'>Wallets</a></li>
		<!--<li><a aria-current='{segment === "about" ? "page" : undefined}' href='about'>About</a></li>-->
	</ul>
</nav>
