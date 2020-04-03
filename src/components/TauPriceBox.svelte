<script>
    import { PriceInfo } from './Stores.svelte'
</script>

<style>
    .flex-column{
        align-items: center;
        margin: 1rem 40px;
    }
</style>

<div class="flex-column">
    <div class="text-body-1 font-primary-dark">Lamden TAU Price</div>
    <h1>{`$${!$PriceInfo ? '0.000' : parseFloat($PriceInfo.price_usd).toPrecision(2)}`}</h1>
</div>