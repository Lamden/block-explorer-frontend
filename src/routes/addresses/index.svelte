<script context="module">
	const apiRoot = "addresses/topWallets.json"
	export async function preload(page, session) {
		let topWalletsList =  await this.fetch(`${apiRoot}?limit=${whitelabel.addresses.table.rows}`).then(res => res.json())
		return { topWalletsList }
	}
</script>

<script>
	//Utils
	import whitelabel from '../../js/whitelabel'

    //Components
	import BigTable from '../../components/BigTable.svelte'

	export let topWalletsList;

	const topWalletsListItems = []

	if (whitelabel.addresses.table.columns.address.show) 
		topWalletsListItems.push({field: 'key', title: whitelabel.addresses.table.columns.address.title, link: true, route: 'addresses', shrink: true})
	if (whitelabel.addresses.table.columns.amount.show) 
		topWalletsListItems.push({
			field: 'value', 
			title: whitelabel.addresses.table.columns.amount.title, 
			flexgrow: true, 
			toFixed: whitelabel.addresses.table.columns.amount.toFixed, 
			prefix: whitelabel.addresses.table.columns.amount.prefix
		})	
</script>

<BigTable limit={whitelabel.addresses.table.rows} title={whitelabel.addresses.table.title} info={topWalletsList} itemList={topWalletsListItems} {apiRoot}/>