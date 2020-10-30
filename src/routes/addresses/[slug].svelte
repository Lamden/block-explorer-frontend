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

    import whitelabel from '../../js/whitelabel'

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
    <h2>{`${whitelabel.addresses.mainInfo.title} `}</h2>
    {#if whitelabel.addresses.mainInfo.showAddress}
        <div class="text-body-2 font-secondary shrink">{`${address}`}</div>
    {/if}
</div>
{#if infoNotFound}
    <div class="flex-row">
		<div class="title">Not Found</div>
	</div>
{:else}
    {#if whitelabel.addresses.mainInfo.balance.show}
        <div class="flex-row">
            <div class="title">Current Balance</div><div class="value">{`${whitelabel.balancePrefix}${formatValue(balance, whitelabel.addresses.mainInfo.balance.toFixed)} ${$NetworkSymbol}`}</div>
        </div>
    {/if}
    {#if whitelabel.addresses.mainInfo.numOfTransactions}
        <div class="flex-row">
            <div class="title"># of Transactions</div><div class="value">{count}</div>
        </div>
    {/if}
    {#if whitelabel.addresses.txInfo.show}
        <h3>{whitelabel.addresses.txInfo.title}</h3>
        {#each txList as tx}
            <div class="flex-column sub-rows">
                {#if whitelabel.addresses.txInfo.items.hash}
                    <div class="flex-row sub-row">
                        <div class="title">Hash</div>
                        <a class="outside-link shrink" rel='prefetch' href={`transactions/${tx.hash}`}>{tx.hash}</a>
                    </div>
                {/if}
                {#if whitelabel.addresses.txInfo.items.blockNum}
                    <div class="flex-row sub-row">
                        <div class="title">Block #</div>
                        <div class="value">{formatValue(tx.blockNum)}</div>
                    </div>
                {/if}
                {#if whitelabel.addresses.txInfo.items.nonce}
                    <div class="flex-row sub-row">
                        <div class="title">Nonce</div>
                        <div class="value">{formatValue(tx.nonce)}</div>
                    </div>
                {/if}
                {#if whitelabel.addresses.txInfo.items.status}
                    <div class="flex-row sub-row">
                        <div class="title">Status</div>
                        <div class="value" class:text-red={tx.status === 1} class:text-green={tx.status === 0}>
                            {tx.status === 1 ? 'Failed' : 'Success'}
                        </div>
                    </div>
                {/if}
                {#if whitelabel.addresses.txInfo.items.result}
                    <div class="flex-row sub-row">
                        <div class="title">Result</div>
                        <div class="value" class:text-red={tx.status === 1}>
                            {formatValue(tx.result)}
                        </div>
                    </div>
                {/if}
                {#if whitelabel.addresses.txInfo.items.contractName}
                    <div class="flex-row sub-row">
                        <div class="title">Contract</div>
                        <div class="value">{tx.contractName}</div>
                    </div>
                {/if}
                {#if whitelabel.addresses.txInfo.items.functionName}
                    <div class="flex-row sub-row">
                        <div class="title">Function</div>
                        <div class="value">{tx.functionName}</div>
                    </div>
                {/if}
                {#if tx.contractName === 'currency' && tx.functionName === 'transfer'}
                    {#each Object.keys(tx.kwargs) as kwarg}
                        {#if kwarg === 'to' &&  whitelabel.addresses.txInfo.items.to}
                            <div class="flex-row sub-row">
                                <div class="title">{tx.sender === address ? 'To' : 'From'}</div>
                                {#if tx.sender === address}
                                    <a class="outside-link shrink" rel='prefetch' href={`addresses/${tx.kwargs[kwarg]}`}>{tx.kwargs[kwarg]}</a>
                                {:else}
                                    <a class="outside-link shrink" rel='prefetch' href={`addresses/${tx.sender}`}>{tx.sender}</a>
                                {/if}
                            </div>
                        {/if}
                        {#if kwarg === 'amount' &&  whitelabel.addresses.txInfo.items.amount.show}
                            <div class="flex-row sub-row">
                                <div class="title">{tx.sender === address ? 'Sent' : 'Received'}</div>
                                <div class="value">{`${whitelabel.addresses.txInfo.items.amount.prefix ? whitelabel.balancePrefix : ""}${formatValue(tx.kwargs[kwarg], whitelabel.addresses.txInfo.items.amount.toFixed)} ${$NetworkSymbol}`}</div>
                            </div>
                        {/if}
                    {/each}
                {/if}
                {#if whitelabel.addresses.txInfo.items.numOfStateChanges}
                    <div class="flex-row sub-row">
                        <div class="title"># of State Changes</div>
                        <div class="value">{formatValue(tx.numOfStateChanges)}</div>
                    </div>
                {/if}
            </div>
        {/each}

        {#if count > 10}
            <Button name={whitelabel.addresses.txInfo.buttonText} 
                type={'solid'} 
                color={'primary'} 
                click={fetchMoreTransactions}
                width={'232px'}
                height={'36px'}
                margin={'1rem 0'}
            />
        {/if}
    {/if}
{/if}