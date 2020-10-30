<script context="module">
	//Utils
	import { formatValue } from '../../js/utils'
	import { StampRatio, NetworkSymbol } from '../../js/stores'

	export async function preload(page, session) {
		const { slug } = page.params;
		const res = await this.fetch(`transactions/transaction.json?hash=${slug}`)
    	return await res.json()
	}
</script>

<script>
	import { isLamdenKey } from '../../js/utils'
	import whitelabel from '../../js/whitelabel'

	export let tx;
	export let hash;

	$: txNotFound = typeof tx === 'undefined'
	$: stampsToTAU = txNotFound ? 0 : $StampRatio === 0 ? 0 : tx.stampsUsed / $StampRatio;

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
		line-height: 1;
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
	<title>{txNotFound ? `Tx not found` : `tx: ${hash}`}</title>
</svelte:head>

{#if txNotFound}
	<h2>{`Hash Not Found`}</h2>
{:else}
	<div class="flex-row header">
		<h2>{`${whitelabel.transactions.title} `}</h2>
		{#if whitelabel.transactions.showTransactionHash}
			<div class="text-body-2 font-secondary shrink">{`${hash}`}</div>
		{/if}
	</div>
		{#if whitelabel.transactions.mainInfo.status}
			<div class="flex-row">
				<div class="title">Status</div>
				<div class="value" class:text-red={tx.status === 1} class:text-green={tx.status === 0}>
					{tx.status === 1 ? 'Failed' : 'Success'}
				</div>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.timestamp}
			<div class="flex-row">
				<div class="title">Timestamp</div><div class="value">{new Date(tx.timestamp).toLocaleString()}</div>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.result}
			<div class="flex-row">
				<div class="title">Result</div><div class="value" class:text-red={tx.status === 1}>{formatValue(tx.result)}</div>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.blockNum}
			<div class="flex-row">
				<div class="title">Block Number</div>
				<a class="outside-link shrink" rel='prefetch' href={`blocks/${tx.blockNum}`}>{tx.blockNum}</a>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.subBlockNum}
			<div class="flex-row">
				<div class="title">SubBlock Number</div><div class="value">{tx.subBlockNum}</div>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.sender}
			<div class="flex-row">
				<div class="title">Sender</div>
				<a class="outside-link shrink" rel='prefetch' href={`addresses/${tx.sender}`}>{tx.sender}</a>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.nonce}
			<div class="flex-row">
				<div class="title">Nonce</div><div class="value">{tx.nonce}</div>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.processor}
			<div class="flex-row">
				<div class="title">Processor</div><div class="value">{tx.processor}</div>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.stampsUsed}
			<div class="flex-row">
				<div class="title">Stamps Used</div>
				<div class="value">
					{`${formatValue(tx.stampsUsed)} ( ${parseFloat(stampsToTAU).toPrecision(3)} ${$NetworkSymbol} )`}
				</div>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.contractName}
			<div class="flex-row">
				<div class="title">Contract Name</div><div class="value">{tx.contractName}</div>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.functionName}
			<div class="flex-row">
				<div class="title">Function Name</div><div class="value">{tx.functionName}</div>
			</div>
		{/if}
		{#if whitelabel.transactions.mainInfo.signature}
			<div class="flex-row">
				<div class="title">Signature</div><div class="value">{tx.signature}</div>
			</div>
		{/if}

		{#if whitelabel.transactions.kwargInfo.show}
			<h3>{whitelabel.transactions.kwargInfo.title || "Kwargs"}</h3>
			{#if Object.keys(tx.kwargs).length === 0}
				<div class="title">{`None`}</div>
			{:else}
				{#each Object.keys(tx.kwargs) as kwarg}
					<div class="flex-row">
						<div class="title">{kwarg}</div>
						{#if isLamdenKey(tx.kwargs[kwarg])}
							<a class="outside-link shrink" rel='prefetch' href={`addresses/${tx.kwargs[kwarg]}`}>{tx.kwargs[kwarg]}</a>
						{:else}
							<div class="value">{formatValue(tx.kwargs[kwarg])}</div>
						{/if}
					</div>
				{/each}
			{/if}
		{/if}

		{#if whitelabel.transactions.stateChanges.show}
			<h3>{whitelabel.transactions.stateChanges.title || "State Changes"}</h3>
			{#if Array.isArray(tx.state)}
				{#each tx.state as kwarg}
					<div class="flex-column sub-rows">
						{#if whitelabel.transactions.stateChanges.showAdvanced}
							<div class="flex-row sub-row">
								<div class="title">Contract</div>
								<div class="value">{makeKey(kwarg.key).contractName}</div>
							</div>
							<div class="flex-row sub-row">
								<div class="title">Variable</div>
								<div class="value">{makeKey(kwarg.key).functionName}</div>
							</div>
						{/if}
						{#if makeKey(kwarg.key).key}
							<div class="flex-row sub-row">
								<div class="title">Key</div>
								{#if isLamdenKey(makeKey(kwarg.key).key)}
									<a class="outside-link shrink" rel='prefetch' href={`addresses/${makeKey(kwarg.key).key}`}>{makeKey(kwarg.key).key}</a>
								{:else}
									<div class="value">{makeKey(kwarg.key).key}</div>
								{/if}
							</div>
						{/if}
						<div class="flex-row sub-row">
							<div class="title">New Value</div>
							<div class="value">{formatValue(kwarg.value)}</div>
						</div>
					</div>
				{/each}
			{:else}
				<p>None</p>
			{/if}
		{/if}
{/if}