<script lang="ts">
    import {Input} from "sveltestrap";
    import {createEventDispatcher} from "svelte";

    let searchPrompt = ""
    export let list: any[] = []
    $: {
        console.log(list)
        doSearch()
    }
    const eventDispatcher = createEventDispatcher()

    function doSearch() {
        const searchResults = list.filter((item) => item.toFullString().toLowerCase().includes(searchPrompt.toLowerCase())) || []
        eventDispatcher('search', {searchResults: searchResults})
    }

</script>
<Input
        type="search"
        name="search"
        id="search"
        placeholder="search"
        on:keyup={doSearch}
        bind:value={searchPrompt}
/>