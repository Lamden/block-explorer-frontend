<script>
    //Props
    export let id = "";
    export let type = 'solid';
    export let color = ''
    export let name = '';
    export let click;
    export let icon = '';
    export let iconWidth = '14px';
    export let iconPosition = 'before';
    export let iconInvert = false;
    export let width = 'unset';
    export let height = 'unset';
    export let padding = '13px 16px';
    export let margin = 'unset';
    export let classes = 'button__solid';
    export let styles = '';
    export let disabled = false;
    export let tabIndex = null;

    $: iconAfter = iconPosition === 'after' ? true : false;
</script>

<style>
button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 10px;
    margin: 2px;
    padding: 3px;
    cursor: pointer;
}


button.solid{
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    border: unset;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
}

.buttonGroup-left{
    box-shadow: unset;
    border-radius: 5px 0 0 5px;
}

.buttonGroup-right{
    box-shadow: unset;
    border-radius: 0 5px 5px 0;
}

.buttonGroup-center{
    box-shadow: unset;
    border-radius: 0;
    border-left: 1px solid var(--font-secondary);
    border-right: 1px solid var(--font-secondary);
}

.button-text{
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: unset;
    border: unset;
    background: var(--bg-color);
    color: var(--font-secondary);
}

.button-icon{
    background-color: unset;
    border: unset;
}

button.transparent{
    display: flex;
    align-items: center;
    background-color: unset;
    border: unset;
    border: 1px solid rgb(255, 255, 255, 0.38);
    border-radius: 4px;
    color: #fff;
    padding: 13px 8px 13px 12px;
}

button.primary{
    color: var(--button-primary-text-color);
    background: var(--button-primary-bg-color);
}

button.secondary{
    color: var(--button-secondary-text-color);
    background: var(--button-secondary-bg-color);
}

button:hover{
    filter: brightness(85%)
}


button.red{
    color: #FFFFFF;
    background: red;
}

button.transparent:hover{
    background-color: rgba(255, 255, 255, 0.12);
}

.label{
    text-align: center;
    width: 100%;
}

.label-left{
    margin: 0 0 0 11px; 
}

.label-right{
    margin: 0 11px 0 0; 
}

.icon {
    /*width: 16px;*/
}

.icon-left {
    margin: 0 8px 0 0;   
}

.icon-right {
    margin: 0 0 0 8px;
}

.icon-after{
    flex-direction: row-reverse;
}

.icon-invert{
    filter: invert(1);
}

</style>

<button class={`${classes}`}
        class:solid={type === 'solid'}
        class:transparent={type === 'transparent'}
        class:primary={color === 'primary'}
        class:secondary={color === 'secondary'}
        class:red={color === 'red'}
        class:blue={color === 'blue'}
        id={id}
        on:click={click}
        disabled={disabled}
        style="min-width: fit-content; width: {width}; height: {height}; padding: {padding}; margin: {margin}; {styles}"
        class:icon-after={iconAfter}
        tabIndex={tabIndex}
        type="button"
    >

    {#if icon !== ''}
        <div class="icon" style={`width: ${iconWidth}; fill:${'blue'};`} 
            class:icon-left={!iconAfter} 
            class:icon-right={iconAfter}
            class:icon-invert={iconInvert}>{@html icon}</div>
    {/if}

    <div class="text-button" class:lable-left={iconAfter} class:lable-right={!iconAfter}> {name} </div>
 </button>