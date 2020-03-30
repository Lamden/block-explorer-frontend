<script>
    import { onMount } from 'svelte'
    $: totalAddresses = 0

    onMount(async () => {
        totalAddresses = await fetch('https://explorer.lamden.io/api/states/totaladdresses').then(res => res.json())
    })
</script>

<style>
    .flex-column{
        align-items: center;
        margin: 1rem 40px;
    }
</style>
<div class="flex-column">
    <div class="text-body-1 font-primary-dark">Wallet Addresses Created</div>
    <h1>{parseInt(totalAddresses).toLocaleString()}</h1>
</div>