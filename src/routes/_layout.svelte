<script>
	import { onMount } from 'svelte'
	import Nav from '../components/Nav.svelte';

	export let segment;

	onMount(async () => {
		let response = await fetch('http://localhost:1337/blocks').then(res => res.json())
		console.log(response)
	})
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>