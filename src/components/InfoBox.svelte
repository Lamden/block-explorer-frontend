<script>
    //Components
    import Button from './Button.svelte'

    //Utils
    import { formatValue } from '../js/utils'
    import whitelabel from '../js/whitelabel'

    //Props
    export let id;
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
    padding-right: 10px;
}
.col-header-divider{
    border-bottom: 2px solid var(--divider-color);
}
.col-item{
    padding: 5px 20px 5px 0;
    max-width: 90%;
    white-space: nowrap;
	text-overflow: ellipsis;
    overflow: hidden;
}
.row-divider{
    border-bottom: 1px solid var(--divider-color);
}
.flex-grow{
    flex-grow: 1;
}

.mobile-col{
    display: none;
}

@media (min-width: 480px) {
    .mobile-col{
        display: flex;
        flex-direction: column;
    }
    .col-item{
        max-width: 100%;
    }
    .col-header{
        padding-right: 20px;
    }
}
</style>

<h2 {id}>{title}</h2>
{#await info}
    {`...Loading`}
{:then res}
    <div class="flex-table">
        {#each itemList as colInfo}
            <div class:col={!colInfo.hideMobile} class:mobile-col={colInfo.hideMobile} class:flex-grow={colInfo.flexgrow} class:shrink={colInfo.shrink} >
                <div class="col-header text-body-1 font-secondary">{colInfo.title}</div>
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
                                    <div class="col-item text-body-1" class:shrink={colInfo.shrink}>
                                        {`${colInfo.prefix ? whitelabel.balancePrefix : ""}` + formatValue(rowInfo[rowItem], colInfo.toFixed !== undefined ? colInfo.toFixed : undefined)}
                                    </div>
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
<Button name={whitelabel.mainpage.buttonText} 
        type={'solid'} 
        color={'primary'} 
        click={navigate}
        width={'232px'}
        height={'36px'}
        margin={'1rem 0'}
 />




