<script context="module">
	export async function preload(page, session) {
		const { slug } = page.params;
		const res = await this.fetch(`https://explorer.lamden.io/api/transactions/get/${slug}`)

		if (res.status === 200) {
			let tx = await res.json();
			return {tx};
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import { isLamdenKey } from '../../js/utils'

	export let tx;

	$:txNotFound = typeof tx === 'undefined'

	 const makeKey = (rawKey) => {
		return {
			contractName: rawKey.split(":")[0].split(".")[0],
			functionName: rawKey.split(":")[0].split(".")[1],
			key: rawKey.split(/:(.+)/)[1]
		}
	 }
</script>

<style>
	h2{
		margin-right: 10px;
	}
	h3{
		margin: 1rem 0 0;
	}
	div.flex-row{
		border-bottom: 1px dotted var(--divider-color);
		flex-grow: 1;
		padding: 8px 0;
	}
	div.flex-column.sub-rows{
		border-bottom: 1px dotted var(--divider-color);
		flex-grow: 1;
		padding: 8px 0;
	}
	div.flex-row.sub-row{
		border-bottom: none;
	}
	div.title{
		min-width: 150px;
	}
	.header {
        align-items: baseline;
	}
	div.value{
		display: inline;
		word-break: break-word;
	}
</style>

<svelte:head>
	<title>{txNotFound ? `Tx not found` : `tx: ${tx.hash}`}</title>
</svelte:head>

{#if txNotFound}
	<h2>{`Hash Not Found`}</h2>
{:else}
	<div class="flex-row header">
		<h2>{`Hash: `}</h2><div class="text-body-2 font-primary-dark shrink">{`${tx.hash}`}</div>
	</div>
		<div class="flex-row">
			<div class="title">Status</div>
			<div class="value">
				{tx.status === 1 ? 'Failed' : 'Success'}
			</div>
		</div>
		<div class="flex-row">
			<div class="title">Timestamp</div><div class="value">{tx.timestamp}</div>
		</div>
		<div class="flex-row">
			<div class="title">Block Number</div>
			<a class="outside-link shrink" rel='prefetch' href={`block/${tx.blockNum}`}>{tx.blockNum}</a>
		</div>
		<div class="flex-row">
			<div class="title">SubBlock Number</div><div class="value">{tx.subBlockNum}</div>
		</div>
		<div class="flex-row">
			<div class="title">Sender</div>
			<a class="outside-link shrink" rel='prefetch' href={`address/${tx.sender}`}>{tx.sender}</a>
		</div>
		<div class="flex-row">
			<div class="title">Nonce</div><div class="value">{tx.nonce}</div>
		</div>
		<div class="flex-row">
			<div class="title">Processor</div><div class="value">{tx.processor}</div>
		</div>
		<div class="flex-row">
			<div class="title">Stamps Used</div><div class="value">{tx.stampsUsed}</div>
		</div>
		<div class="flex-row">
			<div class="title">Contract Name</div><div class="value">{tx.contractName}</div>
		</div>
		<div class="flex-row">
			<div class="title">Function Name</div><div class="value">{tx.functionName}</div>
		</div>
		<div class="flex-row">
			<div class="title">Signature</div><div class="value">{tx.signature}</div>
		</div>
		<h3>Kwargs</h3>
		{#if Object.keys(tx.kwargs).length === 0}
			<div class="title">{`None`}</div>
		{:else}
			{#each Object.keys(tx.kwargs) as kwarg}
				<div class="flex-row">
					<div class="title">{kwarg}</div>
					{#if isLamdenKey(tx.kwargs[kwarg])}
						<a class="outside-link shrink" rel='prefetch' href={`address/${tx.kwargs[kwarg]}`}>{tx.kwargs[kwarg]}</a>
					{:else}
						<div class="value">{tx.kwargs[kwarg]}</div>
					{/if}
				</div>
			{/each}
		{/if}
		<h3>State Changes</h3>
		{#each tx.state as kwarg}
			<div class="flex-column sub-rows">
				<div class="flex-row sub-row">
					<div class="title">Contract</div>
					<div class="value">{makeKey(kwarg.key).contractName}</div>
				</div>
				<div class="flex-row sub-row">
					<div class="title">Variable</div>
					<div class="value">{makeKey(kwarg.key).functionName}</div>
				</div>
				{#if makeKey(kwarg.key).key}
					<div class="flex-row sub-row">
						<div class="title">Key</div>
						{#if isLamdenKey(makeKey(kwarg.key).key)}
							<a class="outside-link shrink" rel='prefetch' href={`address/${makeKey(kwarg.key).key}`}>{makeKey(kwarg.key).key}</a>
						{:else}
							<div class="value">{makeKey(kwarg.key).key}</div>
						{/if}
					</div>
				{/if}
				<div class="flex-row sub-row">
					<div class="title">New Value</div>
					<div class="value">{kwarg.value}</div>
				</div>
			</div>
		{/each}
{/if}