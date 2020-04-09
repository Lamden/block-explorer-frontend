<script>
    import { onMount } from 'svelte'

    //Utils
    import { ApiURL } from '../js/utils'

    $: totalContracts = 0

    onMount(async () => {
        totalContracts = await fetch(`${ApiURL}/states/totalcontracts`).then(res => res.json())
    })
</script>

<style>
    .flex-column{
        align-items: center;
        width: 225px;
    }
</style>
<div class="flex-column">
    <div class="text-body-1 font-primary-dark">Total Smart Contracts</div>
    <h1>{parseInt(totalContracts).toLocaleString()}</h1>
</div>