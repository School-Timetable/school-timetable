<script>
    import { all_classrooms, all_professor, all_subjects } from "$lib/stores/global_store";
    import { generateCookieFile } from "$lib/utils/cookie_file_writer";
    import { onMount } from "svelte";


    onMount(() => {
        const generate_file = () => localStorage.setItem("data.tdf", generateCookieFile($all_professor, $all_classrooms, $all_subjects));

        all_professor.subscribe(generate_file);
        all_classrooms.subscribe(generate_file);
        all_subjects.subscribe(generate_file);
    });

</script>

<slot />