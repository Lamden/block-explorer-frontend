<script>
    //Components
    import Button from './Button.svelte'

    //Utils
    import { formatValue } from '../js/utils'
    import whitelabel from '../js/whitelabel'

    //Props
    export let id;
    export let title = '';
    export let numOfRows = 1;
    export let itemList = [];
    export let route;

    $: items = Array.from(Array(numOfRows).keys());

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
.placeholder{
    background: rgba(255, 255, 255, 0.132);
    margin: 0.4rem 5px 0.4rem 0;
    border-radius: 99px;
    animation: pulse 2.5s linear infinite;
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

@keyframes pulse {
    0% {
        background: rgba(255, 255, 255, 0.132)
    }

    50% {
        background: rgba(255, 255, 255, 0.201)
    }

    100% {
        background: rgba(255, 255, 255, 0.132)
    }
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

<div class="flex-table">
    {#each itemList as colInfo}
        <div class:col={!colInfo.hideMobile} class:mobile-col={colInfo.hideMobile} class:flex-grow={colInfo.flexgrow} class:shrink={colInfo.shrink} >
            <div class="col-header text-body-1 font-secondary">{colInfo.title}</div>
            <div class="col-header-divider"></div>
                {#each items as rowInfo}
                    <div class="placeholder col-item">
                        <div class="placeholder"></div>
                    </div>
                    <div class="row-divider"></div>
                {/each}
        </div>
    {/each}
</div>

<Button name={whitelabel.mainpage.buttonText} 
        type={'solid'} 
        color={'primary'} 
        click={navigate}
        width={'232px'}
        height={'36px'}
        margin={'1rem 0'}
 />




