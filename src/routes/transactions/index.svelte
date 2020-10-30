<script context="module">
	const apiRoot = "transactions/transactions.json"
	const limit = 20

	export async function preload(page, session) {
		let txList =  await this.fetch(`${apiRoot}?limit=${limit}&offset=0`).then(res => res.json())
		return { txList }
	}
</script>

<script>
	//Utils
	import whitelabel from '../../js/whitelabel'

    //Components
	import BigTable from '../../components/BigTable.svelte'
	
	export let txList;

	const txListItems = []

	if (whitelabel.transactions.table.columns.contract.show) 
		txListItems.push({field: 'contractName', title: whitelabel.transactions.table.columns.contract.title})
	if (whitelabel.transactions.table.columns.function.show) 
		txListItems.push({field: 'functionName', title: whitelabel.transactions.table.columns.function.title, hideMobile: true})
	if (whitelabel.transactions.table.columns.stampsUsed.show) 
		txListItems.push({field: 'stampsUsed', title: whitelabel.transactions.table.columns.stampsUsed.title})
	if (whitelabel.transactions.table.columns.hash.show) 
		txListItems.push({field: 'hash', title: whitelabel.transactions.table.columns.hash.title, link: true, route: 'transactions', shrink: true})

</script>

<BigTable limit={whitelabel.transactions.table.rows} title={whitelabel.transactions.table.title} info={txList} itemList={txListItems} {apiRoot}/>