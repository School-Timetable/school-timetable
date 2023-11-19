<script lang="ts">
    import { goto } from "$app/navigation";
	import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import { Navbar, NavbarBrand } from "sveltestrap";
</script>

<Navbar expand="md">
	<div class="left-group">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p id="title" class="zoom-hover" on:click={() => {goto("/")}} >SCHOOL TIMETABLE</p>
        
        <div class="vl"></div>
        <div class="zoom-hover">
            <NavbarBrand style="margin-left: 20px;" href="/data-input-form"> Input Form </NavbarBrand>
        </div>
        
    </div>

	<ThemeSwitcher />

</Navbar>

<style>
    p {
        font-size: 23px;
        font-weight: bold;
        cursor: pointer;
        margin: 0 0 0 30px;
        padding: 0;
    }

    .left-group {
        display: flex;
        align-items: center;
    }

    .vl {
        border-left: 1px solid white;
        height: 30px;
        margin-left: 20px;
    }
        
</style>