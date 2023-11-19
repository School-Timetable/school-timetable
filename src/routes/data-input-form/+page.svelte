<script lang="ts">
	import type { TabItem } from "$model/model-generics";
	import Tabs from "$lib/components/Tabs.svelte";
	import Subjects from "$lib/components/Subjects.svelte";
	import Professors from "$lib/components/Professors.svelte";
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";
	import { backOut, cubicIn, cubicOut, linear, quadOut } from "svelte/easing";
	import Classes from "$lib/components/Classes.svelte";
	import { Col, Nav, NavLink, Row } from "sveltestrap";

	onMount(async () => {
		document
			.getElementsByTagName("body")[0]
			.setAttribute("data-load", "complete");
	});

	export let tabItems: TabItem[] = [
		{ name: "Professor", icon: "person-video2" },
		{ name: "Class", icon: "door-closed" },
		{ name: "Subject", icon: "file-earmark-ruled" },
	];
	export let activeTab: string = "Professor";

	const triggerTabChange = (event: { detail: string }) => {
		activeTab = event.detail;
	};

	let options = { duration: 300, easing: quadOut };
</script>

<Row>
	<Col>
		<Nav>
			<NavLink href="/">Home</NavLink>
		</Nav>
	</Col>
	<Col xs="auto">
		<Tabs
			{tabItems}
			activeItem={activeTab}
			on:tabChange={triggerTabChange}
		/>
	</Col>
	<Col />
</Row>

{#if activeTab === "Professor"}
	<div
		in:slide|global={{ ...options, axis: "y", delay: 100 }}
		out:slide|global={{ ...options, axis: "y" }}
	>
		<Professors />
	</div>
{:else if activeTab === "Class"}
	<div
		in:slide|global={{ ...options, axis: "y", delay: 100 }}
		out:slide|global={{ ...options, axis: "y" }}
	>
		<Classes />
	</div>
{:else if activeTab === "Subject"}
	<div
		in:slide|global={{ ...options, axis: "y", delay: 100 }}
		out:slide|global={{ ...options, axis: "y" }}
	>
		<Subjects />
	</div>
{/if}
