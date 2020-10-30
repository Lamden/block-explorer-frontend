<script>
    import { PriceInfo } from '../js/stores'
</script>

<style>
    .flex-column{
        align-items: center;
        width: 225px;
        z-index: 10;
    }
</style>

<div class="flex-column">
    <div class="text-body-1 font-secondary">Lamden TAU Price</div>
    <h1>{`$${!$PriceInfo ? '0.000' : parseFloat($PriceInfo.price_usd).toPrecision(2)}`}</h1>
</div>