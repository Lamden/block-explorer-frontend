<script>
	import { onMount, afterUpdate, createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    //Images
	import arrowLeft from '../../static/img/icons/arrow-left.svg'
	import arrowRight from '../../static/img/icons/arrow-right.svg'
	import arrowLineLeft from '../../static/img/icons/arrow-line-left.svg'
    import arrowLineRight from '../../static/img/icons/arrow-line-right.svg'

	//Utils
    import { ApiURL } from '../js/utils'
    
    //Props
    export let limit = 10;
    export let apiRoot;

    let currentList = [];

    $: totalRecords = 0;
    $: pages = [...makePages(totalRecords)];
    $: currentPage = 1;
    $: maxItem = getMaxItem(currentPage)
    $: minItem = maxItem - limit < 0 ? 0 : maxItem - limit
    
    onMount(async () => {
        fetchData(`?limit=${limit}`)
    })

    afterUpdate(() => {

    })

    const fetchData = async (parms) => {
        let response = await fetch(`${ApiURL}${apiRoot}${parms}`).then(res => res.json())
        currentList = response.data
        totalRecords = response.count
        dispatch('updateList', currentList)
    }

    const setPage = async (pageNum) => {
        currentPage = pageNum
        let newLimit = limit
        let offset = totalRecords - (limit * pageNum)
        if (offset < 0 ) {
            offset = 0
            newLimit = limit - ((limit * pageNum) - totalRecords)
        }
        fetchData(`?action=prev&offset=${offset}&limit=${newLimit}`)
    }

    const nextPage = () => {
        let nextPage = currentPage + 1
        if (nextPage * limit < totalRecords + limit){
            setPage(nextPage)
        } 
    }

    const prevPage = () => {
        if (currentPage !== 1) setPage(currentPage - 1)
    }

    const makePages = (totalRecs) => {
        let pagesArray = [];
        const numOfPages = parseInt(totalRecs / limit) + Math.ceil((totalRecs / limit) % 1) || 1;
        if (numOfPages > 0){
            let counter = 1;
            while (counter <= numOfPages){
                pagesArray.push(counter)
                counter = counter + 1;
            }
        }else pagesArray = [1];
        return pagesArray;
    }

    const getMaxItem = (pageNum) => {
        if ((pageNum * limit) > totalRecords) return totalRecords
        return totalRecords - (pageNum * limit)
    }

</script>

<style>
.pagenation{
    margin-top: 1rem;
    justify-content: space-between;
    align-items: center;
}

.current{
    background: var(--primary-color)
}

.buttons > div {
    padding: 2px 5px;
    margin: 0 2px;
}

</style>

<div class="pagenation flex-row">
    <span class="showing">
        {#if currentList.length > 0}
        {`showing ${maxItem}-${maxItem-limit} of ${totalRecords}`}
        {:else}
            {`showing 0-0 of 0`}
        {/if}
    </span>
    <div class="flex-row buttons">
        <!--<div>{@html arrowLineLeft}</div>-->
        <div on:click={prevPage}>{@html arrowLeft}</div>
        {#each pages as pageNum}
            <div on:click={() => setPage(pageNum)} class:current={pageNum === currentPage}>{pageNum}</div>
        {/each}
        <div on:click={nextPage}>{@html arrowRight}</div>
        <!--<div>{@html arrowLineRight}</div>-->
    </div>
</div>