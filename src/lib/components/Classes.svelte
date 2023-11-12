<script lang="ts">
	import { Cellphone } from "$model/professor/cellphone";
	import { Mail } from "$model/professor/mail";
	import { Name as ProfessonName } from "$model/professor/name";
	import { Professor } from "$model/professor/professor";
	import { Surname } from "$model/professor/surname";
	import { SchoolClass } from "$model/school-class/school-class";
	import { Section } from "$model/school-class/section";
	import { ZodError, z } from "zod";
	import { Subject } from "$model/subject/subject";
	import {
		Button,
		ButtonGroup,
		Form,
		Icon,
		Input,
		Label,
		Table,
	} from "sveltestrap";
    import { Year } from "$model/school-class/year";
    import type { Track } from "$model/school-class/track";

	let schoolClassTemplate = SchoolClass.of(100, 1, "A");
    let schoolClass = SchoolClass.of(4, 2, "D");
	let schoolClass2 = SchoolClass.of(3, 4, "C", "Scientifico");

    // TODO: check  
    const sections = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]

    let schoolClassesMap = new Map<number, SchoolClass[]>();
    for (let i = 1; i <= 5; i++) {
        console.log("index ", i)
        schoolClassesMap.set(i, []);
    }

    console.log("map before get: ", schoolClass)

    schoolClassesMap.get(schoolClass.year.value)!.push(schoolClass);
    schoolClassesMap.get(schoolClass2.year.value)!.push(schoolClass2);
    console.log("map: ", schoolClassesMap)
    // TODO: set schoolClasses from db

	let tmpSchoolClassIndex: number | null = null;
	let tmpSchoolClass: SchoolClassFormData | null = null;

	type SchoolClassFormData = {
        _id: number | undefined;
		_year: { value: number };
		_section: { value: string };
		_track: { value: string };
	};

	function editSchoolClass(schoolClass: SchoolClass) {
        console.log("edit button clicked")
	}

	function createNewSchoolClass() {
        console.log("add button clicked")

	}

    function cancelEditSchoolClass() {
        console.log("cancel button clicked")

	}

    function removeSchoolClass(schoolClass: SchoolClass) {
		console.log("remove button clicked")
	}


    function saveExistingSchoolClass() {

    }

    function saveNewSchoolClass() {
    }

    function saveSchoolClass() {
        if(tmpSchoolClassIndex)
            saveExistingSchoolClass()
        else saveNewSchoolClass()
    }

</script>

<h1>Classes</h1>

<Form>
	<table class="text-center">
		<thead>
			<tr>
				<th>Year</th>
				<th>Section</th>
				<th>Track</th>
			</tr>
		</thead>
		<tbody>
            {#each [...schoolClassesMap] as [year, classesList]}
                {#each classesList as schoolClass, index}
                    {#if tmpSchoolClassIndex != index}
                        <tr>
                            <td>{schoolClass.year}</td>
                            <td>{schoolClass.section}</td>
                            <td>{schoolClass.track || "-"}</td>
                            
                            <td>
                                <Button
                                    color="primary"
                                    on:click={() => editSchoolClass(schoolClass)}
                                >
                                    Edit <Icon name="pencil-square" />
                                </Button>
                                <!-- TODO: add confirmation dialog -->
                                <Button
                                    color="danger"
                                    on:click={() => removeSchoolClass(schoolClass)}>
                                    Delete <Icon name="trash-fill" />
                                </Button>
                            </td>
                        </tr>
                    {:else if tmpSchoolClass}
                        <tr>
                            <td>
                                <Label for="year">Year</Label>
                                <Input
                                    type="number"
                                    label="year"
                                    name="year"
                                    id="year"
                                    bind:value={tmpSchoolClass._year.value}
                                    min="1"
                                    max="5"
                                    on:keydown = {(event) => {event?.preventDefault()}}
                                />
                            </td>
                            <td>
                                <Label for="section">Section</Label>
                                <select class="form-select" bind:value={tmpSchoolClass._section.value}> <!-- on:change={() => (answer = '')}-->
                                    {#each sections as section}
                                        <option value={section}>{section}</option>
                                    {/each}
                                </select>
                            </td>
                            <td>
                                <Label for="track">Track</Label>
                                <Input
                                    type="text"
                                    label="track"
                                    name="track"
                                    id="track"
                                    bind:value={tmpSchoolClass._track.value}
                                />
                            </td>
                            <td>
                                <!-- save button -->
                                <Button color="primary" on:click={saveSchoolClass}>
                                    Save <Icon name="check" />
                                </Button>
                                <!-- cancel button -->
                                <Button color="danger" on:click={cancelEditSchoolClass}>
                                    Cancel <Icon name="x" />
                                </Button>
                            </td>
                        </tr>
                    {/if}
                {/each}
			{/each}

			{#if tmpSchoolClass && tmpSchoolClassIndex == null}
				<tr>
					<td>
                        <Label for="year">Year</Label>
                        <Input
                            type="number"
                            label="year"
                            name="year"
                            id="year"
                            bind:value={tmpSchoolClass._year.value}
                            min="1"
                            max="5"
                        />
                    </td>
                    <td>
                        <Label for="section">Section</Label>
                        <select class="form-select" bind:value={tmpSchoolClass._section.value}> <!-- on:change={() => (answer = '')}-->
                        {#each sections as section}
                            <option value={section}>{section}</option>
                        {/each}
                        </select>
                    </td>
                    <td>
                        <Label for="track">Track</Label>
                        <Input
                            type="text"
                            label="track"
                            name="track"
                            id="track"
                            bind:value={tmpSchoolClass._track.value}
                        />
                    </td>
					<td>
						<!-- save button -->
						<Button color="primary" on:click={saveSchoolClass}>
							Save <Icon name="check" />
						</Button>
						<!-- cancel button -->
						<Button color="danger" on:click={cancelEditSchoolClass}>
							Cancel <Icon name="x" />
						</Button>
					</td>
				</tr>
			{/if}

			<tr>
				<td colspan="7">
					<ButtonGroup>
						<Button color="primary" on:click={createNewSchoolClass}>
							Add <Icon name="plus" />
						</Button>
					</ButtonGroup>
				</td>
			</tr>
		</tbody>
	</table>
</Form>
