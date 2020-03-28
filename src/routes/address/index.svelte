<script>
    import { onMount } from 'svelte' 
    //Components
    import BigTable from '../../components/BigTable.svelte'

	//Utils
	import { isLamdenKey } from '../../js/utils'

	$: topWalletsList = [];
	const topWalletsListItems = [
		{field: 'rank', title: 'Rank'},
		{field: 'key', title: 'Address', link: true, route: 'address', shrink: true},
		{field: 'value', title: 'Amount', flexgrow: true},
	]
    
    onMount( async() => {
        let topWallets = await fetch('http://scotts.webhop.net:1337/states/topwallets').then(res => res.json())
		topWallets = topWallets.filter(wallet => isLamdenKey(wallet.key))
		topWallets = topWallets.sort((a, b) => b.value - a.value);
		topWallets.forEach((wallet, index) => wallet.rank = index + 1)
		topWalletsList = topWallets
    })

</script>

<BigTable title={"Top Wallets"} info={topWalletsList} itemList={topWalletsListItems}/>