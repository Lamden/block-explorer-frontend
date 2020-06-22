<script context="module">
	//Utils
	import { ApiURL } from '../../js/utils'

	export const limit = 20;
	export const apiRoot = '/states/topWallets'

	export async function preload(page, session) {
		let topWalletsList =  await this.fetch(`${ApiURL}${apiRoot}?limit=${limit}`).then(res => res.json())
		return { topWalletsList} 
	}
</script>

<script>
    //Components
	import BigTable from '../../components/BigTable.svelte'

	export let topWalletsList;

	const topWalletsListItems = [
		{field: 'key', title: 'Address', link: true, route: 'address', shrink: true},
		{field: 'value', title: 'Amount', flexgrow: true},
	]
</script>

<BigTable {limit} title={"Top Wallets"} info={topWalletsList} itemList={topWalletsListItems} {apiRoot}/>