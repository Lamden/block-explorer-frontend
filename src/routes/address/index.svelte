<script>
    import { onMount } from 'svelte' 
    //Components
    import BigTable from '../../components/BigTable.svelte'

	//Utils
	import { isLamdenKey } from '../transaction/_transaction'

	$: topWalletsList = [];
	const topWalletsListItems = [
		{field: 'rank', title: 'Rank'},
		{field: 'key', title: 'Address', link: true, route: 'address'},
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

<BigTable title={"Top Wallets"} info={topWalletsList} itemList={topWalletsListItems}/>