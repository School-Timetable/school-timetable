<script lang="ts">
    import { weakConstraintsMap } from "$lib/stores/global_store";
    import { WeakConstraint } from "$model/asp/weak_contraint";
	import { flip } from "svelte/animate";
	import { cubicOut } from "svelte/easing";
	import { Tooltip } from "sveltestrap";

	export let weak_constraints: Map<number, WeakConstraint> = new Map();

	if (weak_constraints.size == 0) {
		weak_constraints.set(1, new WeakConstraint({
			name: "contiguous_subject_hours",
			active: true,
			displayName: "Prefer contiguous subject hours",
			tooltip: "tries to put all the hours of the same subject (in a day) in sequence",
		}));

		weak_constraints.set(2, new WeakConstraint({
			name: "least_subjects_batches",
			active: true,
			displayName: "Prefer less subjects batches",
			tooltip: "Minimizes the number of subject blocks (a block is a sequence of hours of the same subject)\nthis results in a timetable with longer blocks of the same subject"
		}));

		weak_constraints.set(3,  new WeakConstraint({
			name: "least_subjects_swaps",
			active: true,
			displayName: "Prefer least subjects swaps",
			tooltip: "Tries to satisfy other constraints with the least number of changes from the current timetable\n"
		}));

		weak_constraints.set(4,  new WeakConstraint({
			name: "minimize_days_weight_difference",
			active: true,
			displayName: "Minimize days weight difference",
			tooltip: "Tries to balance the weight of the days \nWARNING! this may increase the time for generating a solution\ntip: if enabled give it a low priority"
		}));

		weakConstraintsMap.set(weak_constraints);
		
	}

	function swap_up(priority: number) {
		const upper_label = weak_constraints.get(priority - 1)!;
		weak_constraints.set(priority - 1, weak_constraints.get(priority)!);
		weak_constraints.set(priority, upper_label);
		weak_constraints = weak_constraints;
		weakConstraintsMap.set(weak_constraints);
	}

	function swap_down(priority: number) {
		const lower_label = weak_constraints.get(priority + 1)!;
		weak_constraints.set(priority + 1, weak_constraints.get(priority)!);
		weak_constraints.set(priority, lower_label);
		weak_constraints = weak_constraints;
		weakConstraintsMap.set(weak_constraints);
	}

	function toggle_active(priority: number) {
		const label = weak_constraints.get(priority)!;
		label.active = !label.active;
		weak_constraints.set(priority, label);
		weak_constraints = weak_constraints;
		weakConstraintsMap.set(weak_constraints);
	}

	function bring_weak_up(priority: number) {
		if (priority > 1) {
			swap_up(priority);
		}
	}

	function bring_weak_down(priority: number) {
		if (priority < weak_constraints.size) {
			swap_down(priority);
		}
	}
</script>

<div class="col-row">
	<hr class="my-2" />
	<h5>Weak constraints</h5>

	<!-- Add your table rows and data here -->
	{#each weak_constraints as [priority, value] (value.name)}
		<div
			class="card my-2 shadow"
			id="card-{value.name}"
			animate:flip={{ duration: 400, easing: cubicOut }}
			title="{value.tooltip}"
		>
			<div class="card-header py-1 px-2">
				<div class="row align-items-center">
					<div class="col text-nowrap">
						<input
							type="checkbox"
							id="checkbox_{value.name}}"
							bind:checked={value.active}
						/>

						<span>
							Level {priority}
						</span>
					</div>

					<div class="col-auto">
						<div class="btn-group">
							<button
								type="button"
								class="btn btn-outline-primary btn-sm"
								on:click={() => bring_weak_up(priority)}
								disabled={priority == 1}
							>
								<i class="bi bi-arrow-up"></i>
							</button>
							<button
								type="button"
								class="btn btn-outline-primary btn-sm"
								on:click={() => bring_weak_down(priority)}
								disabled={priority == weak_constraints.size}
							>
								<i class="bi bi-arrow-down"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="card-body py-1 px-2">
				{value.displayName}
			</div>
		</div>		
	{/each}
</div>
