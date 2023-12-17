<script lang="ts">
	import { theme } from "$lib/stores/global_store";
	import {
		ButtonDropdown,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Icon,
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

<ButtonDropdown class="text-primary">
	<DropdownToggle caret color="light" outline>
		{currentOption.displayName}
		<Icon name={currentOption.icon} />
	</DropdownToggle>
	<DropdownMenu>
		{#each options as option}
			<DropdownItem
				on:click={() => theme.set(option.theme)}
				class={option == currentOption ? "active" : ""}
			>
				{option.displayName}
				<Icon name={option.icon} />
			</DropdownItem>
		{/each}
	</DropdownMenu>
</ButtonDropdown>
