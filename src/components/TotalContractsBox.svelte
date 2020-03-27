<script>
    import { onMount } from 'svelte'
    $: totalContracts = 0

    onMount(async () => {
        totalContracts = await fetch('http://localhost:1337/states/totalcontracts').then(res => res.json())
    })
</script>

<style>
    .flex-column{
        align-items: center;
        margin: 1rem 40px;
    }
</style>
<div class="flex-column">
    <div class="text-body-1 font-primary-dark">Total Smart Contracts</div>
    <h1>{parseInt(totalContracts).toLocaleString()}</h1>
</div>