<script lang="ts">
	import { theme } from "$lib/stores/global_store";
	import {
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Icon,
		Input,
		Styles,
	} from "sveltestrap";

	type ThemeOption = {
		theme: "auto" | "light" | "dark";
		displayName: string;
		icon: string;
	};

	let options: ThemeOption[] = [
		{ theme: "auto", displayName: "Auto", icon: "circle-half" },
		{ theme: "light", displayName: "Light", icon: "sun-fill" },
		{ theme: "dark", displayName: "Dark", icon: "moon-fill" },
	];

	$: currentOption =
		options.find((option) => option.theme === $theme) || options[0];
</script>

<Dropdown>
	<DropdownToggle caret>
		{currentOption.displayName}
		<Icon name={currentOption.icon} />
	</DropdownToggle>
	<DropdownMenu>
		{#each options as option}
			<DropdownItem on:click={() => ($theme = option.theme)}>
				{option.displayName}
				<Icon name={option.icon} />
			</DropdownItem>
		{/each}
	</DropdownMenu>
</Dropdown>

<Styles theme={$theme} />
