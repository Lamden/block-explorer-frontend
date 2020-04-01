<script>
    //Components
    import BigTable from '../../components/BigTable.svelte'
    import Pagenation from '../../components/Pagenation.svelte'
    

    let limit = 15;
    let apiRoot = '/blocks'
    

    $: blockList = [];
	const blockListItems = [
		{field: 'blockNum', title: 'Block', link: true, route: 'block'},
		{field: 'numOfSubBlocks', title: 'SubBlocks'},
		{field: 'numOfTransactions', title: 'Transactions'},
		{field: 'hash', title: 'Hash', flexgrow: true, shrink: true}
    ]

    const updateList = (e) => {
        blockList = e.detail
    }

</script>

<BigTable title={"Latest Blocks"} info={blockList} itemList={blockListItems}/>
<Pagenation {apiRoot} on:updateList={updateList}/>