<script context="module">
	const apiRoot = "blocks/blocks.json"
	const limit = 20
	export async function preload(page, session) {
		let blockList =  await this.fetch(`${apiRoot}?limit=${limit}`).then(res => res.json())
		return { blockList }
	}
</script>

<script>
    //Components
    import BigTable from '../../components/BigTable.svelte';  

	export let blockList;
	
	const blockListItems = [
		{field: 'blockNum', title: 'Block', link: true, route: 'blocks'},
		{field: 'numOfSubBlocks', title: 'SubBlocks'},
		{field: 'numOfTransactions', title: 'Transactions'},
		{field: 'hash', title: 'Hash', flexgrow: true, shrink: true}
    ]
</script>

<BigTable {limit} title={"Latest Blocks"} info={blockList} itemList={blockListItems} {apiRoot}/>