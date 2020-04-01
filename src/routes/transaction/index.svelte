<script>
    //Components
	import BigTable from '../../components/BigTable.svelte'
    import Pagenation from '../../components/Pagenation.svelte'

	let apiRoot = '/transactions'
	
	$: txList = [];
	const txListItems = [
		{field: 'contractName', title: 'Contract'},
		{field: 'functionName', title: 'Function'},
		{field: 'stampsUsed', title: 'Stamps Used'},
		{field: 'hash', title: 'Hash', link: true, route: 'transaction', shrink: true}
	]

    const updateList = (e) => {
        txList = e.detail
    }

</script>

<BigTable title={"Latest Transactions"} info={txList} itemList={txListItems}/>
<Pagenation {apiRoot} on:updateList={updateList} reverse={true}/>