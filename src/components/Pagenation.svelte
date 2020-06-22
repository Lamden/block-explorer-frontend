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
    export let count;
    export let apiRoot;
    export let reverse = false;

    let currentList = [];
    let firstLoad = true;

    $: totalRecords = count;
    $: numOfPages = parseInt(count / limit) + Math.ceil((count / limit) % 1) || 1;
    $: currentPage = 1;
    $: pages = [];
    $: minItem = 0;
    $: maxItem = 0;
    
    onMount(async () => {
        makePages(currentPage);
        setMinMax();
    })

    const processData = (response) => {
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
            dispatch('updateList', {
                offset: (currentPage * limit) - limit
            })
            makePages();
            setMinMax();
        }
    }

    const nextPage = () => {
        let nextPage = currentPage + 1
        if (nextPage * limit < count){
            setPage(nextPage)
        }
    }

    const prevPage = () => {
        if (currentPage !== 1) setPage(currentPage - 1)
    }

    const makePages = () => {
        let pagesArray = [];
        if (numOfPages > 0){
            let counter = 1;
            while (counter <= numOfPages){
                pagesArray.push(counter)
                counter = counter + 1;
            }
        }else{
            pagesArray = [1];
        }

        if (pagesArray.length > 10){
            let currPageIndex = pagesArray.indexOf(currentPage)
            let lastFive = currPageIndex > pagesArray.length - 6
            pagesArray = [
                currPageIndex > 0 ? '...' : null,
                ...lastFive ? pagesArray.slice( - 5) : pagesArray.slice( currPageIndex, currPageIndex + 5),
                currPageIndex < pagesArray.length - 5 ? '...' : null
            ]
        }
        pages = pagesArray;
    }

    const maxPage = () => {
        if (currentPage !== numOfPages) setPage(numOfPages)
    }

    const minPage = () => {
        if (currentPage !== 1) setPage(1)
    }

    const setMinMax = () => {
        setMinItem();
        setMaxItem();
    }
    const setMaxItem = () => {
        maxItem = count - ((limit * currentPage) - limit)
    }
    const setMinItem = () => {
        let min = (count - ((limit * currentPage))) + 1
        minItem = min < 0 ? 1 : min;
    }

</script>

<style>
.pagenation{
    margin: 1rem 0 0.5rem;
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
        <div>{`results ${maxItem}-${minItem}`}</div>
        <div>{`of ${count} total`}</div>
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
