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
		height: 110px;
		padding: 0 47px;
		align-items: center;
	}

	ul {
		margin: 0 0 0 50px;
		padding: 0;
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
		margin-right: 50px;
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
	}
	.tau-details{
		margin-top: 5px;
	}

</style>

<nav class="flex-row">
	<div class="flex-column logo-box">
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
			width={'100%'}
			icon={'find'}
		/>
	</div>
	<ul>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>Home</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='block'>Blocks</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='about'>About</a></li>
	</ul>
</nav>
