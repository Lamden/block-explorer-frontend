<script>
    import { onMount } from 'svelte' 
    //Components
	import BigTable from '../../components/BigTable.svelte'
	import Pagenation from '../../components/Pagenation.svelte'

	let apiRoot = '/states/topWallets'

	$: topWalletsList = [];
	const topWalletsListItems = [
		{field: 'key', title: 'Address', link: true, route: 'address', shrink: true},
		{field: 'value', title: 'Amount', flexgrow: true},
	]
    
    const updateList = (e) => {
        topWalletsList = e.detail
    }

</script>

<BigTable title={"Top Wallets"} info={topWalletsList} itemList={topWalletsListItems}/>
<Pagenation {apiRoot} on:updateList={updateList} reverse={true}/>