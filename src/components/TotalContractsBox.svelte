<script>
    //utils
    import { formatValue } from '../js/utils'

    export let totalContracts = 0;
</script>

<style>
    .flex-column{
        align-items: center;
        width: 225px;
    }
</style>
<div class="flex-column">
    <div class="text-body-1 font-primary-dark">Total Smart Contracts</div>
    <h1>{formatValue(totalContracts)}</h1>
</div>