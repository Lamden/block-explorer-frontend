<script context="module">
	//Utils
	import { ApiURL } from '../../js/utils'

	export const limit = 20;
	export const apiRoot = '/blocks'

	export async function preload(page, session) {
		let blockList =  await this.fetch(`${ApiURL}${apiRoot}?limit=${limit}`).then(res => res.json())
		return { blockList }
	}
</script>

<script>
    //Components
    import BigTable from '../../components/BigTable.svelte';  

	export let blockList;
	
	const blockListItems = [
		{field: 'blockNum', title: 'Block', link: true, route: 'block'},
		{field: 'numOfSubBlocks', title: 'SubBlocks'},
		{field: 'numOfTransactions', title: 'Transactions'},
		{field: 'hash', title: 'Hash', flexgrow: true, shrink: true}
    ]
</script>

<BigTable {limit} title={"Latest Blocks"} info={blockList} itemList={blockListItems} {apiRoot}/>