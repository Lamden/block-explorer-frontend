<script context="module">
	//Utils
    import { formatValue } from '../../js/utils'
    import { NetworkSymbol } from '../../js/stores'

	export async function preload(page, session) {
        const { slug } = page.params;
        let fetchData = await Promise.all([
			this.fetch(`addresses/address.json?address=${slug}`).then(res => res.json()),
			this.fetch(`addresses/addressBalance.json?address=${slug}`).then(res => res.json()).then(json => {
                if (json.value) return json.value
                else return 0
            })
        ])

return {
			txs: fetchData[0].txs,
			address: fetchData[0].address,
			balance: fetchData[1]
		}
    }
</script>

<script>
    import { onMount } from 'svelte';

    //Components
    import Button from '../../components/Button.svelte'

    export let txs;
    export let address;
    export let balance;

    $: infoNotFound = typeof txs === 'undefined'
    $: txList = infoNotFound ? [] : txs.data
    $: count = infoNotFound ? [] : txs.count

    $: moreResults = 0;
    $: offset = moreResults * 10;
     
     const fetchMoreTransactions = async () => {
        moreResults = moreResults  + 1 
        let res = await fetch(`addresses/transactionHistory.json?address=${address}&offset=${moreResults * 10}`)
                        .then(res => res.json())
                        .then(res => {
                            if (res.data.length > 0) txList = [...txList, ...res.data]
                        })
                        .catch(err => console.log(err))   
     }

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
        line-height: 1.2;
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
		<div class="title">Current Balance</div><div class="value">{`${formatValue(balance)} ${$NetworkSymbol}`}</div>
	</div>
    <div class="flex-row">
		<div class="title"># of Transactions</div><div class="value">{count}</div>
	</div>
    <h3>Transactions</h3>
    {#each txList as tx}
        <div class="flex-column sub-rows">
            <div class="flex-row sub-row">
                <div class="title">Hash</div>
                <a class="outside-link shrink" rel='prefetch' href={`transactions/${tx.hash}`}>{tx.hash}</a>
            </div>
            <div class="flex-row sub-row">
                <div class="title">Block #</div>
                <div class="value">{formatValue(tx.blockNum)}</div>
            </div>
            <div class="flex-row sub-row">
                <div class="title">Nonce</div>
                <div class="value">{formatValue(tx.nonce)}</div>
            </div>
            <div class="flex-row sub-row">
                <div class="title">Status</div>
                <div class="value" class:text-red={tx.status === 1} class:text-green={tx.status === 0}>
                    {tx.status === 1 ? 'Failed' : 'Success'}
                </div>
            </div>
            <div class="flex-row sub-row">
                <div class="title">Result</div>
                <div class="value" class:text-red={tx.status === 1}>
                    {formatValue(tx.result)}
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
                                <a class="outside-link shrink" rel='prefetch' href={`addresses/${tx.kwargs[kwarg]}`}>{tx.kwargs[kwarg]}</a>
                            {:else}
                                <a class="outside-link shrink" rel='prefetch' href={`addresses/${tx.sender}`}>{tx.sender}</a>
                            {/if}
                        </div>
                    {/if}
                    {#if kwarg === 'amount'}
                        <div class="flex-row sub-row">
                            <div class="title">{tx.sender === address ? 'Sent' : 'Received'}</div>
                            <div class="value">{`${formatValue(tx.kwargs[kwarg])} ${$NetworkSymbol}`}</div>
                        </div>
                    {/if}
                {/each}
            {/if}
            <div class="flex-row sub-row">
                <div class="title"># of State Changes</div>
                <div class="value">{formatValue(tx.numOfStateChanges)}</div>
            </div>
        </div>
    {/each}
    {#if count > 10}
        <Button name={'MORE'} 
            type={'solid'} 
            color={'purple'} 
            click={fetchMoreTransactions}
            width={'232px'}
            height={'36px'}
            margin={'1rem 0'}
        />
    {/if}
{/if}