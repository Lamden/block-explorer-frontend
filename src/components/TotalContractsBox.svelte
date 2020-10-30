<script>
    //utils
    import { formatValue } from '../js/utils'

    export let totalContracts = 0;
</script>

<style>
    .flex-column{
        align-items: center;
        width: 225px;
        z-index: 10;
    }
</style>
<div class="flex-column">
    <div class="text-body-1 font-secondary">Total Smart Contracts</div>
    <h1>{formatValue(totalContracts)}</h1>
</div>