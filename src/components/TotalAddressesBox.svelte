<script>
    //Utils
    import { formatValue } from '../js/utils'
    
    export let totalAddresses = 0;
</script>

<style>
    .flex-column{
        align-items: center;
        width: 225px;
    }
</style>
<div class="flex-column">
    <div class="text-body-1 font-primary-dark">Wallet Addresses Created</div>
    <h1>{formatValue(totalAddresses)}</h1>
</div>