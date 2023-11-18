<script lang="ts">
	import { Icon, Input, InputGroup, InputGroupText } from "sveltestrap";
	import { createEventDispatcher } from "svelte";

	const eventDispatcher = createEventDispatcher<{
		search: { searchResults: any[] };
	}>();

	let searchPrompt = "";
	export let items: any[] = [];
	$: {
		// to signal to svelte that the list is a dependency of the computed value
		items;
		searchPrompt;
		doSearch();
	}

	function doSearch() {
		let searchResults;
		if (searchPrompt == "") {
			// defensive copy to avoid mutating the original list
			searchResults = [...items];
		} else {
			searchResults =
				items.filter((item) =>
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
