<script>
    //Components
    import Button from './Button.svelte'

    //Props
    export let title = '';
    export let info = [];
    export let itemList = [];
    export let route;

    const navigate = () => {
		window.location.href = `/${route}`
	}

</script>

<style>
h2{
    margin-top: 3rem;
}
.flex-table{
    display: flex;
    flex-direction: row;
}
.col{
    display: flex;
    flex-direction: column;
}
.col-header{
    min-width: max-content;
    padding-right: 20px;
}
.col-header-divider{
    border-bottom: 2px solid var(--divider-color);
}
.col-item{
    padding: 5px 20px 5px 0;
    overflow: hidden;
}
.row-divider{
    border-bottom: 1px solid var(--divider-color);
}
.flex-grow{
    flex-grow: 1;
}
</style>

<h2>{title}</h2>
{#await info}
    {`...Loading`}
{:then res}
    <div class="flex-table">
        {#each itemList as colInfo}
            <div class="col" class:flex-grow={colInfo.flexgrow} class:shrink={colInfo.shrink}>
                <div class="col-header text-body-1 font-primary-dark">{colInfo.title}</div>
                <div class="col-header-divider"></div>
                {#if colInfo.title === 'Rank'}
                    {#each res as rowInfo, index}
                        <div class="col-item text-body-1" >{index + 1}</div>
                        <div class="row-divider"></div>
                    {/each}
                {:else}
                    {#each res as rowInfo}
                        {#each Object.keys(rowInfo) as rowItem}
                            {#if colInfo.field === rowItem}
                                {#if colInfo.link}
                                    <a class="outside-link col-item text-body-1" class:shrink={colInfo.shrink} rel='prefetch' href={`${colInfo.route}/${rowInfo[rowItem]}`}>{rowInfo[rowItem]}</a>
                                {:else}
                                    <div class="col-item text-body-1" class:shrink={colInfo.shrink}>{rowInfo[rowItem]}</div>
                                {/if}
                                <div class="row-divider"></div>
                            {/if}
                        {/each}
                    {/each}
                {/if}
            </div>
        {/each}
    </div>
{/await}
<Button name={'VIEW MORE'} 
        type={'solid'} 
        color={'purple'} 
        click={navigate}
        width={'232px'}
        height={'36px'}
        margin={'1rem 0'}
 />




