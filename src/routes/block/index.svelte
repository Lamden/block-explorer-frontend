<script>
    import { onMount } from 'svelte' 
    //Components
    import BigTable from '../../components/BigTable.svelte'

	$: blockList = [];
	const blockListItems = [
		{field: 'blockNum', title: 'Block', link: true, route: 'block'},
		{field: 'numOfSubBlocks', title: '#of SubBlocks'},
		{field: 'numOfTransactions', title: '#of Transactions'},
		{field: 'hash', title: 'Hash', flexgrow: true}
    ]
    
    onMount( async() => {
        blockList = await fetch('http://scotts.webhop.net:1337/blocks').then(res => res.json())
    })

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

<BigTable title={"Latest Blocks"} info={blockList} itemList={blockListItems}/>