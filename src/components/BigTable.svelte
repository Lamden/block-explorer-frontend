<script>
    //Components
    import Button from './Button.svelte'

    //Props
    export let title = '';
    export let info = [];
    export let itemList = [];

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
.shrink{
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 150px;
    overflow: hidden;
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
            <div class="col" class:flex-grow={colInfo.flexgrow}  class:shrink={colInfo.shrink}>
                <div class="col-header text-body-1 font-primary-dark">{colInfo.title}</div>
                <div class="col-header-divider"></div>
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
            </div>
        {/each}
    </div>
{/await}




