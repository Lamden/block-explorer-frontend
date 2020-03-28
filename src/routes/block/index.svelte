<script>
    import { onMount } from 'svelte' 
    //Components
    import BigTable from '../../components/BigTable.svelte'

	$: blockList = [];
	const blockListItems = [
		{field: 'blockNum', title: 'Block', link: true, route: 'block'},
		{field: 'numOfSubBlocks', title: 'SubBlocks'},
		{field: 'numOfTransactions', title: 'Transactions'},
		{field: 'hash', title: 'Hash', flexgrow: true, shrink: true}
    ]
    
    onMount( async() => {
        blockList = await fetch('http://scotts.webhop.net:1337/blocks').then(res => res.json())
    })

</script>

<BigTable title={"Latest Blocks"} info={blockList} itemList={blockListItems}/>