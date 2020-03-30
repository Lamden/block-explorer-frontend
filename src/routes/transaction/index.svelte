<script>
    import { onMount } from 'svelte' 
    //Components
    import BigTable from '../../components/BigTable.svelte'

	$: txList = [];
	const txListItems = [
		{field: 'contractName', title: 'Contract'},
		{field: 'functionName', title: 'Function'},
		{field: 'stampsUsed', title: 'Stamps Used'},
		{field: 'hash', title: 'Hash', link: true, route: 'transaction', shrink: true}
	]
    onMount( async() => {
        txList = await fetch('https://explorer.lamden.io/api/transactions').then(res => res.json())
    })

</script>

<BigTable title={"Latest Transactions"} info={txList} itemList={txListItems}/>