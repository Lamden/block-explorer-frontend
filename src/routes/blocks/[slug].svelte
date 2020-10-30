<script context="module">
	//Utils
	import {formatValue } from '../../js/utils'

	export async function preload(page, session) {
        const { slug } = page.params;
		const res = await this.fetch(`blocks/block.json?blockNum=${slug}`)
    	return await res.json()
    }
</script>

<script>
	import whitelabel from '../../js/whitelabel'

	export let block;
	export let blockNum;

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
	.outside-link{
	    white-space: nowrap;
		text-overflow: ellipsis;
		min-width: 30px;
		overflow: hidden;	
	}
</style>

<svelte:head>
	<title>{blockNotFound ? `Block not found` : `Block # ${formatValue(blockNum)}`}</title>
</svelte:head>

<div class="flex-row header">
	<h2>{`${whitelabel.blocks.title} `}</h2>
	{#if whitelabel.blocks.showBlockNum}
		<div class="text-body-2 font-secondary">{formatValue(blockNum)}</div>
	{/if}
</div>
{#if blockNotFound}
	<div class="flex-row">
		<div class="title">Not Found</div>
	</div>
{:else}
	{#if whitelabel.blocks.mainInfo.hash}
		<div class="flex-row">
			<div class="title">Hash</div><div class="value shrink">{block.hash}</div>
		</div>
	{/if}
	{#if whitelabel.blocks.mainInfo.previousHash}
		<div class="flex-row">
			<div class="title">Previous Hash</div><div class="value shrink">{block.previous}</div>
		</div>
	{/if}
	{#if whitelabel.blocks.mainInfo.numOfSubBlocks}
		<div class="flex-row">
			<div class="title"># of SubBlocks</div><div class="value">{formatValue(block.numOfSubBlocks)}</div>
		</div>
	{/if}
	{#if whitelabel.blocks.mainInfo.numOfTransactions}
		<div class="flex-row">
			<div class="title"># of Transactions</div><div class="value">{formatValue(block.numOfTransactions)}</div>
		</div>
	{/if}
	{#if whitelabel.blocks.mainInfo.transactions}
		<div class="flex-row">
			<div class="title">Transactions</div>
			<div class="value flex-column shrink">
				{#if block.transactions.length === 0}
					{'None'}
				{:else}
					{#each block.transactions as transaction}
					<a class="outside-link" rel='prefetch' href={`transactions/${transaction}`}>{transaction}</a>
					{/each}
				{/if}
			</div>
		</div>
	{/if}		
{/if}