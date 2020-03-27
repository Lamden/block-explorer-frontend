<script>
    import { onMount } from 'svelte' 
    //Components
    import BigTable from '../../components/BigTable.svelte'

	$: txList = [];
	const txListItems = [
		{field: 'contractName', title: 'Contract'},
		{field: 'functionName', title: 'Function'},
		{field: 'stampsUsed', title: 'Stamps Used'},
		{field: 'hash', title: 'Hash', link: true, route: 'transaction'}
	]
    onMount( async() => {
        txList = await fetch('http://scotts.webhop.net:1337/transactions').then(res => res.json())
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

<BigTable title={"Latest Transactions"} info={txList} itemList={txListItems}/>