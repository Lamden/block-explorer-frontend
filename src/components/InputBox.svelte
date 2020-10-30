<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    //Props
    export let id = "";
    export let styles = ''; 
    export let borderColor;
    export let icon = undefined;
    export let value;
    export let label = '';
    export let placeholder = '';
    export let inputType = 'text';
    export let pattern = "";
    export let required = false;
    export let width = '100%';
    export let height = 'unset';
    export let backgroundColor = '';
    export let spellcheck = false;
    export let rows = '1'
    export let readonly = false
    export let autofocus = false;

    export let thisInput = null;

    let isFocused = false;

    const dispatchChanged = (e) => {
        dispatch('changed', e);
    }

    const dispatchKeyUp = (e) => {
        dispatch('keyup', e);
    }

    const handleClick = () => {
        dispatch('iconClick', value);
    }

</script>

<style>
.inputbox{
    margin-top: -1rem;
}
label{
    position: relative;
    top: 10px;
    left: 12px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    padding: 0 4px;
    color: var(--font-primary);
}
.outter-box{
    align-items: center;
    width: 100%;
    min-height: 42px;
    border: 1px solid var(--divider-color);
    box-sizing: border-box;
    transition: border 0.5s;
    border-radius: 4px;
    padding: 8px;
}
.mainbox{
    display: flex;
    align-items: center;
    background: none;
    border: none;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: var(--font-primary);
    letter-spacing: 0.44px;
}

.mainbox:focus{
    outline: none; 
    
}

.focus{
    border: 1px solid var(--primary-color);
}
.mainbox::-webkit-input-placeholder { 
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.44px;
    color: var(--font-secondary);
}

/* Chrome, Safari, Edge, Opera */
.mainbox::-webkit-outer-spin-button,
.mainbox::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.mainbox[type=number] {
  -moz-appearance:textfield;
}

.mainbox:-webkit-autofill,
.mainbox:-webkit-autofill:hover, 
.mainbox:-webkit-autofill:focus
 {
  border: 1px solid var(--divider-color);
  -webkit-text-fill-color: var(--font-primary);
  box-shadow: 0 0 0px 1000px var(--bg-color) inset;
}

.icon{
    width: 17.5px;
    height: 17.5px;
    margin-right: 12px;
    margin-left: 7px;
    cursor: pointer;
}

#icon-find{
    fill: var(--font-primary);
}
#icon-find:hover{
    fill: var(--accent-color);
}
</style>
<div class="inputbox" style={`width: ${width};`} >
    <label style={`background: ${backgroundColor || 'var(--bg-color)'};`}> {label} </label>
    <div class="flex-row outter-box" style={`border: 1px solid ${borderColor}`} class:focus={isFocused && !borderColor} >
        {#if icon === 'find'}
            <div class="icon" on:click={handleClick}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="icon-find" d="M6.5 0C8.22391 0 9.87721 0.684819 11.0962 1.90381C12.3152 3.12279 13 4.77609 13 6.5C13 8.11 12.41 9.59 11.44 10.73L11.71 11H12.5L17.5 16L16 17.5L11 12.5V11.71L10.73 11.44C9.59 12.41 8.11 13 6.5 13C4.77609 13 3.12279 12.3152 1.90381 11.0962C0.684819 9.87721 0 8.22391 0 6.5C0 4.77609 0.684819 3.12279 1.90381 1.90381C3.12279 0.684819 4.77609 0 6.5 0ZM6.5 2C4 2 2 4 2 6.5C2 9 4 11 6.5 11C9 11 11 9 11 6.5C11 4 9 2 6.5 2Z" fill="#E0E0E0"/>
                </svg>
            </div>
        {/if}

        {#if inputType === "password"}
            <!-- svelte-ignore a11y-autofocus -->
            <input
                id={id}
                bind:value={value}
                bind:this={thisInput}
                on:change={(e) => dispatchChanged(e)}
                on:keyup={(e) => dispatchKeyUp(e)}
                class="mainbox input:required:invalid input:focus:invalid"
                style={`width: 100%; height: ${height}; ${styles}`}
                type="password"
                pattern={pattern}
                placeholder={placeholder}
                required={required}
                spellcheck={spellcheck}
                autofocus={autofocus}>
        {/if}
        {#if inputType === "number"}
            <!-- svelte-ignore a11y-autofocus -->
            <input
                id={id}
                bind:value={value}
                bind:this={thisInput}
                on:change={(e) => dispatchChanged(e)}
                on:keyup={(e) => dispatchKeyUp(e)}
                class="mainbox input:required:invalid input:focus:invalid"
                style={`width: 100%; height: ${height}; ${styles}`}
                type="number"
                min="0.000000001"
                step="0.000000001"
                placeholder={placeholder}
                required={required}
                autofocus={autofocus}  />
        {/if}
        {#if inputType === "textarea"}
            <!-- svelte-ignore a11y-autofocus -->
            <textarea
                id={id}
                rows={rows}
                bind:value={value}
                bind:this={thisInput}
                on:change={(e) => dispatchChanged(e)}
                on:keyup={(e) => dispatchKeyUp(e)}
                class="mainbox textarea:required:invalid textarea:focus:invalid"
                style={`width: 100%; height: ${height}; font-family: 'Roboto', sans-serif; ${styles}`}
                pattern={pattern}
                placeholder={placeholder}
                readonly={readonly}
                required={required}
                spellcheck={spellcheck}
                autofocus={autofocus}  />
        {/if}
        {#if inputType === 'text'}
            <!-- svelte-ignore a11y-autofocus -->
            <input
                id={id}
                bind:value={value}
                bind:this={thisInput}
                on:change={(e) => dispatchChanged(e)}
                on:keyup={(e) => dispatchKeyUp(e)}
                class="mainbox input:required:invalid input:focus:invalid"
                style={`width: 100%; height: ${height}; ${styles}`}
                pattern={pattern}
                placeholder={placeholder}
                required={required}
                spellcheck={spellcheck}
                autofocus={autofocus} 
                on:focusin={() => {isFocused = true}}
                on:focusout={() => {isFocused = false}}  />
        {/if}    
    </div>
</div>