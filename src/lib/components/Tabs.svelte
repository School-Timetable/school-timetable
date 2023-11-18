<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Styles, Icon, Nav } from "sveltestrap";
	import type { TabItem } from "$model/model-generics";
	import { fly, slide } from "svelte/transition";
	import { linear } from "svelte/easing";

	const dispatch = createEventDispatcher();

	export let tabItems: TabItem[];
	export let activeItem: string;

	let options = { duration: 300, easing: linear };
</script>

<div
	class="tabs pt-3"
	in:slide|global={{ ...options, axis: "y", delay: 100 }}
	out:slide|global={{ ...options, axis: "y" }}
>
	<ul>
		{#each tabItems as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li on:click={() => dispatch("tabChange", item.name)}>
				<div
					class="zoom-hover-text"
					class:active={item.name === activeItem}
				>
					{item.name}
					<Icon name={item.icon} />
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	ul {
		display: flex;
		justify-content: center;
		padding: 0;
		list-style-type: none;
		min-height: 2rem;
	}
	li {
		padding: 0 16px;
		font-size: 18px;
		cursor: pointer;
		transition: 0.2s ease;
	}

	.active {
		color: var(--bs-primary);
		border-bottom: 2px solid var(--bs-primary);
		padding-bottom: 0px;
		transition: 0.2s ease;
		font-weight: bold;
	}

	.zoom-hover-text:hover {
		color: var(--bs-primary);
		padding-bottom: 3px;
		transition: 0.2s ease;
	}

	.zoom-hover-text:hover:not(.active) {
		color: var(--bs-primary);
		border-bottom: 1px solid var(--bs-primary);
		padding-bottom: 3px;
		transition: 0.2s ease;
	}
</style>
