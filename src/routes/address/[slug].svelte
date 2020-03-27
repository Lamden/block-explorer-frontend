<script context="module">
	export async function preload(page, session) {
        const { slug } = page.params;
		const res = await this.fetch(`http://localhost:1337/transactions/${slug}`)
		if (res.status === 200) {
			let txs = await res.json();
			return {addressInfo:{txs, address: slug}};
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import { onMount } from 'svelte';

	export let addressInfo;

    $: infoNotFound = typeof addressInfo === 'undefined'
    $: balance = 0;
	 
	 onMount(async () => {
         if (!infoNotFound){
             let res = await fetch(`http://localhost:1337/states/balances/${addressInfo.address}`)
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
		display: inline;
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
	div.value{
		display: inline;
		word-break: break-word;
	}
</style>

<svelte:head>
	<title>{infoNotFound ? `Tx not found` : `${addressInfo.address}`}</title>
</svelte:head>

{#if infoNotFound}
	<h2>{`Address Not Found`}</h2>
{:else}
	<h2>{`Address: `}</h2><span class="text-body-2 font-primary-dark">{`${addressInfo.address}`}</span>
    <div class="flex-row">
		<div class="title">Current Balance</div><div class="value">{`${parseFloat(balance).toLocaleString()} dTAU`}</div>
	</div>
    <div class="flex-row">
		<div class="title"># of Transactions</div><div class="value">{addressInfo.txs.length}</div>
	</div>
    <h3>Transactions</h3>
    {#each addressInfo.txs as tx}
        <div class="flex-column sub-rows">
            <div class="flex-row sub-row">
                <div class="title">Hash</div>
                <a class="outside-link" rel='prefetch' href={`transaction/${tx.hash}`}>{tx.hash}</a>
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
                            <div class="title">{tx.sender === addressInfo.address ? 'To' : 'From'}</div>
                            {#if tx.sender === addressInfo.address}
                                <a class="outside-link" rel='prefetch' href={`address/${tx.kwargs[kwarg]}`}>{tx.kwargs[kwarg]}</a>
                            {:else}
                                <a class="outside-link" rel='prefetch' href={`address/${tx.sender}`}>{tx.sender}</a>
                            {/if}
                        </div>
                    {/if}
                    {#if kwarg === 'amount'}
                        <div class="flex-row sub-row">
                            <div class="title">{tx.sender === addressInfo.address ? 'Sent' : 'Received'}</div>
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