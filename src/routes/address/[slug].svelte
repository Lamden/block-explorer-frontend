<script context="module">
	export async function preload(page, session) {
        const { slug } = page.params;
		const res = await this.fetch(`http://167.99.173.97:1337/transactions/history/${slug}`)
		if (res.status === 200) {
			let txs = await res.json();
			return {txs, address: slug};
		} else {
			return {address: slug}
		}
	}
</script>

<script>
	import { onMount } from 'svelte';

    export let txs;
    export let address;

    $: infoNotFound = typeof txs === 'undefined'
    $: balance = 0;
	 
	 onMount(async () => {
         if (!infoNotFound){
             let res = await fetch(`http://167.99.173.97:1337/states/balances/${address}`)
                                .then(res => res.json())
                                .then(res => {
                                    if (res.value) balance = res.value
                                })
                                .catch(err => console.log(err))            
         }
	 })

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
		border-bottom: 2px dotted var(--divider-color);
		flex-grow: 1;
		padding: 4px 0;
    }
	div.flex-column.sub-rows{
		border-bottom: 1px dotted var(--divider-color);
		flex-grow: 1;
		padding: 1rem 0;
    }
	div.flex-row.sub-row{
		border-bottom: none;
	}
	div.title{
		min-width: 150px;
	}
	div.value{
		display: inline;
		word-break: break-word;
    }
    .header {
        align-items: baseline;
    }

</style>

<svelte:head>
	<title>{infoNotFound ? `Tx not found` : `${address}`}</title>
</svelte:head>

<div class="flex-row header">
    <h2>{`Address: `}</h2><div class="text-body-2 font-primary-dark shrink">{`${address}`}</div>
</div>
{#if infoNotFound}
    <div class="flex-row">
		<div class="title">Not Found</div>
	</div>
{:else}
    <div class="flex-row">
		<div class="title">Current Balance</div><div class="value">{`${parseFloat(balance).toLocaleString()} dTAU`}</div>
	</div>
    <div class="flex-row">
		<div class="title"># of Transactions</div><div class="value">{txs.length}</div>
	</div>
    <h3>Transactions</h3>
    {#each txs as tx}
        <div class="flex-column sub-rows">
            <div class="flex-row sub-row">
                <div class="title">Hash</div>
                <a class="outside-link shrink" rel='prefetch' href={`transaction/${tx.hash}`}>{tx.hash}</a>
            </div>
            <div class="flex-row sub-row">
                <div class="title">Nonce</div>
                <div class="value">{tx.nonce}</div>
            </div>
            <div class="flex-row sub-row">
                <div class="title">Status</div>
                <div class="value">
                    {tx.status === 1 ? 'Failed' : 'Success'}
                </div>
            </div>
            <div class="flex-row sub-row">
                <div class="title">Contract</div>
                <div class="value">{tx.contractName}</div>
            </div>
            <div class="flex-row sub-row">
                <div class="title">Function</div>
                <div class="value">{tx.functionName}</div>
            </div>
            {#if tx.contractName === 'currency' && tx.functionName === 'transfer'}
                {#each Object.keys(tx.kwargs) as kwarg}
                    {#if kwarg === 'to'}
                        <div class="flex-row sub-row">
                            <div class="title">{tx.sender === address ? 'To' : 'From'}</div>
                            {#if tx.sender === address}
                                <a class="outside-link" rel='prefetch' href={`address/${tx.kwargs[kwarg]}`}>{tx.kwargs[kwarg]}</a>
                            {:else}
                                <a class="outside-link" rel='prefetch' href={`address/${tx.sender}`}>{tx.sender}</a>
                            {/if}
                        </div>
                    {/if}
                    {#if kwarg === 'amount'}
                        <div class="flex-row sub-row">
                            <div class="title">{tx.sender === address ? 'Sent' : 'Received'}</div>
                            <div class="value">{`${tx.kwargs[kwarg]} dTAU`}</div>
                        </div>
                    {/if}
                {/each}
            {/if}
            <div class="flex-row sub-row">
                <div class="title"># of State Changes</div>
                <div class="value">{tx.numOfStateChanges}</div>
            </div>
        </div>
    {/each}
{/if}