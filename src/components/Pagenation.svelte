<script>
    import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();

	//Utils
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
        if (apiRoot === 'addresses/topWallets.json' && firstLoad) currentList = response.data;
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
        if ((count - (currentPage * limit)) > 0){
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

    .controls{
        fill: var(--primary-color)
    }
</style>

<div class="pagenation flex-row">
    <div class="flex-row showing">
        <div>{`results ${maxItem}-${minItem}`}</div>
        <div>{`of ${count} total`}</div>
    </div>
    <div class="flex-row buttons">
        <div on:click={minPage} class="pointer">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="controls" d="M0.123093 7.87689V0.123047H1.4154V7.87689H0.123093ZM2.38463 3.99997L7.87694 0.123047V7.87689L2.38463 3.99997Z" fill="white"/>
            </svg>
        </div>
        <div on:click={prevPage} class="pointer LRarrow">
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="controls" d="M7.23075 0.477539V9.52369L0.123059 5.00062L7.23075 0.477539Z" fill="white"/>
            </svg>
        </div>
        {#each pages as pageNum}
            {#if pageNum !== null}
                <div on:click={() => setPage(pageNum)} 
                    class:current={pageNum === currentPage}
                    class:pointer={pageNum !== '...'}>{pageNum}</div>
            {/if}
        {/each}
        <div on:click={nextPage} class="pointer LRarrow">
            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="controls" d="M0.769257 9.52246L0.769257 0.476308L7.87695 4.99938L0.769257 9.52246Z" fill="white"/>
            </svg>
        </div>
        <div on:click={maxPage} class="pointer">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="controls" d="M6.58462 7.87689H7.87692V0.123047H6.58462V7.87689ZM0.123077 7.87689L5.61539 3.99997L0.123077 0.123047V7.87689Z" fill="white"/>
            </svg>
        </div>
    </div>
</div>
