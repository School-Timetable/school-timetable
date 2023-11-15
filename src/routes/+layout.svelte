<script>
    import { allClassrooms, allProfessors, allSubjects } from "$lib/stores/global_store";
    import { generateCookieFile } from "$lib/utils/cookie_file_writer";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    onMount(() => {
        const generate_file = () => localStorage.setItem("data.tdf", generateCookieFile($allProfessors, $allClassrooms, $allSubjects));

        allProfessors.subscribe(generate_file);
        allClassrooms.subscribe(generate_file);
        allSubjects.subscribe(generate_file);
    });
</script>

<slot />