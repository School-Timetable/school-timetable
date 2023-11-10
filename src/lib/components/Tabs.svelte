<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Styles, Icon } from 'sveltestrap';
    import type { TabItem } from '$model/model-generics';
    import { fly, slide } from 'svelte/transition';
    import { linear } from 'svelte/easing';

    const dispatch = createEventDispatcher();

    export let tabItems: TabItem[];
    export let activeItem: string;

	let options = {duration: 300, easing: linear};
</script>

<Styles />

<div class="tabs" in:slide|global={{...options, axis: "y",delay: 100}} out:slide|global={{...options, axis:"y"}}>
    <ul>
        {#each tabItems as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li on:click={() => dispatch('tabChange', item.name)}>
                <div class="zoom-hover-text" class:active={item.name===activeItem}>{item.name}
                <Icon name={item.icon} />
                </div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .tabs {
        margin-top: 10px;
    }
    ul {
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
    }
    li {
        margin: 0 16px;
        font-size: 18px;
        color: var(--color-strongest);
        cursor: pointer;
        transition: 0.2s ease;
    }


    .active {
        color: var(--color-active);
        border-bottom: 2px solid var(--color-active);
        padding-bottom: 8px;
        transition: 0.2s ease;
    }

    .zoom-hover-text:hover {
        color: hsl(132, 62%, 55%);
        transition: 0.2s ease;
    }

    .zoom-hover-text:hover:not(.active) {
        color: hsl(132, 62%, 55%);
        border-bottom: 1px solid hsl(132, 62%, 55%);
        padding-bottom: 3px;
        transition: 0.2s ease;
    }


</style>