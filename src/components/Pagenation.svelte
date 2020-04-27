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
    import validators from 'types-validate-assert'
    const { validateTypes } = validators;
    
    //Props
    export let limit = 10;
    export let apiRoot;
    export let reverse = false;

    let currentList = [];
    let firstLoad = true;

    $: totalRecords = 0;
    $: numOfPages = 0;
    $: currentPage = 1;
    $: pages = [...makePages(totalRecords, currentPage)];
    $: minItem = 0;
    $: maxItem = 0;
    
    onMount(async () => {
        if (apiRoot === '/states/topWallets') fetchData(`?limit=${limit}?reverse=true`)
        else fetchData(`?limit=${limit}`)
    })

    afterUpdate(() => {

    })

    const fetchData = async (parms) => {
        let response = await fetch(`${ApiURL}${apiRoot}${parms}`).then(res => res.json())
        if (apiRoot === '/states/topWallets' && firstLoad) currentList = response.data;
        else currentList = reverse ? response.data.reverse() : response.data;
        firstLoad = false;
        totalRecords = response.count
        if (validateTypes.isArray(totalRecords)) totalRecords = totalRecords[0].count
        dispatch('updateList', currentList)
        maxItem = getMaxItem()
        minItem = getMinItem()
    }

    const setPage = async (pageNum) => {
        if (pageNum !== "..."){
            currentPage = pageNum
            let newLimit = limit
            let offset = totalRecords - (limit * pageNum)
            if (offset < 0 ) {
                offset = 0
                newLimit = limit - ((limit * pageNum) - totalRecords)
            }
            let queryString = `?action=prev&offset=${offset}&limit=${newLimit}`
            if (apiRoot === '/states/topWallets') queryString = queryString + '&reverse=true'
            fetchData(queryString)
        }
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

    const makePages = (totalRecs, currPage) => {
        let pagesArray = [];
        numOfPages = parseInt(totalRecs / limit) + Math.ceil((totalRecs / limit) % 1) || 1;
        if (numOfPages > 0){
            let counter = 1;
            while (counter <= numOfPages){
                pagesArray.push(counter)
                counter = counter + 1;
            }
        }else pagesArray = [1];
        if (pagesArray.length > 10){
            let currPageIndex = pagesArray.indexOf(currPage)
            let lastFive = currPageIndex > pagesArray.length - 6
            pagesArray = [
                currPageIndex > 0 ? '...' : null,
                ...lastFive ? pagesArray.slice( - 5) : pagesArray.slice( currPageIndex, currPageIndex + 5),
                currPageIndex < pagesArray.length - 5 ? '...' : null
            ]
        }
        return pagesArray;
    }

    const maxPage = () => {
        if (currentPage !== numOfPages) setPage(numOfPages)
    }

    const minPage = () => {
        if (currentPage !== 1) setPage(1)
    }

    const getMaxItem = () => {
        let pageIndex = pages.indexOf(currentPage)
        return totalRecords - (pageIndex * limit)
    }
    const getMinItem = () => {
        let minItem = getMaxItem(currentPage) - limit
        if (minItem < 0) minItem = 0
        return minItem
    }

</script>

<style>
.pagenation{
    margin-top: 1rem;
    justify-content: space-between;
    align-items: center;
}
.showing{
    flex-wrap: wrap;
}
.showing > div {
    margin: 0 2px;
}
.current{
    background: var(--primary-color)
}

.buttons > div{
    padding: 2px 5px;
    margin: 0 2px;
}
.LRarrow{
   position: relative;
    top: 1px; 
}

.pointer{
    cursor: pointer;
}

</style>

<div class="pagenation flex-row">
    <div class="flex-row showing">
        {#if currentList.length > 0}
            <div>{`showing ${maxItem}-${minItem}`}</div>
            <div>{`of ${totalRecords} results`}</div>
        {:else}
            <div>{`showing 0-0`}</div>
            <div>{`of 0 results`}</div>
        {/if}
    </div>
    <div class="flex-row buttons">
        <div on:click={minPage} class="pointer">{@html arrowLineLeft}</div>
        <div on:click={prevPage} class="pointer LRarrow">{@html arrowLeft}</div>
        {#each pages as pageNum}
            {#if pageNum !== null}
                <div on:click={() => setPage(pageNum)} 
                    class:current={pageNum === currentPage}
                    class:pointer={pageNum !== '...'}>{pageNum}</div>
            {/if}
        {/each}
        <div on:click={nextPage} class="pointer LRarrow">{@html arrowRight}</div>
        <div on:click={maxPage} class="pointer">{@html arrowLineRight}</div>
    </div>
</div>