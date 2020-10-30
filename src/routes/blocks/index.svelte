<script context="module">
	const apiRoot = "blocks/blocks.json"

	export async function preload(page, session) {
		let blockList =  await this.fetch(`${apiRoot}?limit=${session.whitelabel.blocks.table.rows}`).then(res => res.json())
		return { blockList }
	}
</script>

<script>
	//Utils
	import whitelabel from '../../js/whitelabel'

    //Components
    import BigTable from '../../components/BigTable.svelte';  

	export let blockList;

	const blockListItems = []

	if (whitelabel.blocks.table.columns.block.show) 
		blockListItems.push({field: 'blockNum', title: whitelabel.blocks.table.columns.block.title, link: true, route: 'blocks'})
	if (whitelabel.blocks.table.columns.subBlocks.show) 
		blockListItems.push({field: 'numOfSubBlocks', title: whitelabel.blocks.table.columns.subBlocks.title})
	if (whitelabel.blocks.table.columns.transactions.show) 
		blockListItems.push({field: 'numOfTransactions', title: whitelabel.blocks.table.columns.transactions.title})
	if (whitelabel.blocks.table.columns.hash.show) 
		blockListItems.push({field: 'hash', title: whitelabel.blocks.table.columns.hash.title, flexgrow: true, shrink: true})
	

</script>

<BigTable limit={whitelabel.blocks.table.rows} title={whitelabel.blocks.table.title} info={blockList} itemList={blockListItems} {apiRoot}/>