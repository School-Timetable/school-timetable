<script lang="ts">
	import { Icon, Input, InputGroup, InputGroupText } from "sveltestrap";
	import { createEventDispatcher } from "svelte";

	const eventDispatcher = createEventDispatcher<{
		search: { searchResults: any[] };
	}>();

	let searchPrompt = "";
	export let list: any[] = [];
	$: {
		// to signal to svelte that the list is a dependency of the computed value
		list;
		searchPrompt;
		doSearch();
	}

	function doSearch() {
		let searchResults;
		if (searchPrompt == "") {
			searchResults = [...list];
		} else {
			searchResults =
				list.filter((item) =>
					item
						.toFullString()
						.toLowerCase()
						.includes(searchPrompt.toLowerCase())
				) || [];
		}
		eventDispatcher("search", { searchResults: searchResults });
	}
</script>

<InputGroup>
	<InputGroupText><Icon name="search" /></InputGroupText>
	<Input
		type="search"
		name="search"
		id="search"
		placeholder="search"
		bind:value={searchPrompt}
	/>
</InputGroup>
