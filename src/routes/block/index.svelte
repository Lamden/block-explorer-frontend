<script>
    import { onMount } from 'svelte' 
    //Components
    import BigTable from '../../components/BigTable.svelte'

    let limit = 15;
    let maxBlock = 0;
    let minBlock = 2;
    

    $: blockList = [];
	const blockListItems = [
		{field: 'blockNum', title: 'Block', link: true, route: 'block'},
		{field: 'numOfSubBlocks', title: 'SubBlocks'},
		{field: 'numOfTransactions', title: 'Transactions'},
		{field: 'hash', title: 'Hash', flexgrow: true, shrink: true}
    ]
    
    onMount(() => {
        fetchData(`?limit=${limit}`)
        
    })

    const fetchData = async (parms) => {
        blockList = await fetch(`http://167.99.173.97:1337/blocks${parms}`).then(res => res.json())
        if (blockList[0].blockNum > maxBlock){
            maxBlock = blockList[0].blockNum;
        }
    }

    const nextPage = () => {
        if (blockList[0].blockNum + limit >= maxBlock){
            let start = blockList[0].blockNum + 1
            fetchData(`?action=next&start=${start}&limit=${limit}`)
        }else{
            fetchData(`?limit=${limit}`)
        }

    }

    const prevPage = () => {
        let start = blockList[blockList.length - 1].blockNum - 1
        fetchData(`?action=prev&start=${start}&limit=${limit}`)
    }

</script>

<BigTable title={"Latest Blocks"} info={blockList} itemList={blockListItems}/>
<div class="pages">
    <div on:click={nextPage}>next</div>
    <div on:click={prevPage}>previous</div>
</div>