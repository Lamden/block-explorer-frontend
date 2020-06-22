<script context="module">
	//Utils
	import { ApiURL } from '../../js/utils'

	export const limit = 20;
	export const apiRoot = '/transactions'

	export async function preload(page, session) {
		let txList =  await this.fetch(`${ApiURL}${apiRoot}?limit=${limit}&offset=0`).then(res => res.json())
		return { txList }
	}
</script>

<script>
    //Components
	import BigTable from '../../components/BigTable.svelte'
	
	export let txList;

	const txListItems = [
		{field: 'contractName', title: 'Contract'},
		{field: 'functionName', title: 'Function', hideMobile: true},
		{field: 'stampsUsed', title: 'Stamps Used'},
		{field: 'hash', title: 'Hash', link: true, route: 'transaction', shrink: true}
	]

</script>

<BigTable {limit} title={"Latest Transactions"} info={txList} itemList={txListItems} {apiRoot}/>