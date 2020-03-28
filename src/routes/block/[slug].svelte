<script context="module">
	export async function preload(page, session) {
		const { slug } = page.params;
		const res = await this.fetch(`http://scotts.webhop.net:1337/blocks/number/${slug}`)

		if (res.status === 200) {
			let block = await res.json();
			return {block: block[0], slug};
		} else {
			return {slug}
		}
	}
</script>

<script>
	export let block;
	export let slug;

	$:blockNotFound = typeof block === 'undefined'
</script>

<style>
	h2{
		margin-right: 10px;
	}
	div.flex-row{
		border-bottom: 1px dotted var(--divider-color);
		flex-grow: 1;
		padding: 8px 0;
	}
	div.title{
		min-width: 150px;
	}
	.header {
        align-items: baseline;
	}
	div.value{
		display: inline;
	}
</style>

<svelte:head>
	<title>{blockNotFound ? `Block not found` : `Block # ${block.blockNum}`}</title>
</svelte:head>

<div class="flex-row header">
	<h2>{`Block: `}</h2><div class="text-body-2 font-primary-dark shrink">{slug}</div>
</div>
{#if blockNotFound}
	<div class="flex-row">
		<div class="title">Not Found</div>
	</div>
{:else}
	<div class="flex-row">
		<div class="title">Hash</div><div class="value">{block.hash}</div>
	</div>
	<div class="flex-row">
		<div class="title">Previous Hash</div><div class="value">{block.previous}</div>
	</div>
	<div class="flex-row">
		<div class="title"># of SubBlocks</div><div class="value">{block.numOfSubBlocks}</div>
	</div>
	<div class="flex-row">
		<div class="title"># of Transactions</div><div class="value">{block.numOfTransactions}</div>
	</div>
	<div class="flex-row">
		<div class="title">Transactions</div>
		<div class="value flex-column">
			{#if block.transactions.length === 0}
				{'None'}
			{:else}
				{#each block.transactions as transaction}
				<a class="outside-link shrink" rel='prefetch' href={`transaction/${transaction}`}>{transaction}</a>
				{/each}
			{/if}
		</div>
	</div>		
{/if}