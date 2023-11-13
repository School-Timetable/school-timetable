<script lang="ts">
    import {SchoolClass} from "$model/school-class/school-class";
    import {Button, ButtonGroup, Form, Icon, Input, Label,} from "sveltestrap";
    import {Track} from "$model/school-class/track";

    let schoolClassTemplate = SchoolClass.of(100, 1, "A");
    let schoolClass = SchoolClass.of(4, 2, "D");
	let schoolClass2 = SchoolClass.of(3, 4, "C", "Scientifico");

    // TODO: check  
    const sections = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]

    let schoolClasses = [schoolClass, schoolClass2]

    console.log("array: ", schoolClasses)
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
        tmpSchoolClassIndex = schoolClasses.indexOf(schoolClass);
        tmpSchoolClass = {
            _id: schoolClass.id,
            _year: { value: schoolClass.year.value },
            _section: { value: schoolClass.section.value },
            _track: { value: schoolClass.track?.value || "" }
        };
        schoolClasses = schoolClasses;
	}

	function createNewSchoolClass() {
        if (tmpSchoolClassIndex !== null)
            cancelEditSchoolClass()
        const newId = getNextId(schoolClasses)
        console.log("New id: ", newId)
        tmpSchoolClass = {
            _id: newId,
            _year: {value: schoolClassTemplate.year.value},
            _section: {value: schoolClassTemplate.section.value},
            _track: {value: ""}
        }
        schoolClasses = schoolClasses
	}

    function cancelEditSchoolClass() {
        tmpSchoolClass = null;
		tmpSchoolClassIndex = null
		schoolClasses = schoolClasses
	}

    function removeSchoolClass(schoolClass: SchoolClass) {
        const toRemoveIndex = schoolClasses.indexOf(schoolClass)
        schoolClasses.splice(toRemoveIndex, 1)
        schoolClasses = schoolClasses
	}

    // TODO: This is just a temporary function whose content must be replaced with the actual ID assignment...
    function getNextId(schoolClasses: SchoolClass[]): number {
        let lastId = 0
        schoolClasses.forEach(schoolClass => {
            if(schoolClass.id > lastId)
                lastId = schoolClass.id
        })
        
        return lastId + 1
    }

    function saveExistingSchoolClass() {
        // check if there's already a school class with the same year, section and track
        if(classAlreadyExists(tmpSchoolClass, schoolClasses)) {
            alert("School class already exists")
            return
        }

        let track = tmpSchoolClass!._track.value == "" ? undefined : new Track(tmpSchoolClass!._track.value)
        let newSchoolClass = SchoolClass.of(
            tmpSchoolClass!._id!,
            tmpSchoolClass!._year.value,
            tmpSchoolClass!._section.value,
            track?.value
        )
        schoolClasses.push(newSchoolClass)
        // delete the old school class
        schoolClasses.splice(tmpSchoolClassIndex!, 1)

        
        schoolClasses = schoolClasses
        cancelEditSchoolClass()
    }

    function saveNewSchoolClass(tmpSchoolClass: SchoolClassFormData | null, schoolClasses: SchoolClass[]) {
        if(classAlreadyExists(tmpSchoolClass, schoolClasses)){
            alert("School class already exists")
            return
        }
        const track = tmpSchoolClass!._track.value == "" ? undefined : new Track(tmpSchoolClass!._track.value)
        const newSchoolClass = SchoolClass.of(
            tmpSchoolClass!._id!,
            tmpSchoolClass!._year.value,
            tmpSchoolClass!._section.value,
            track?.value
        )

        schoolClasses.push(newSchoolClass)
        schoolClasses = schoolClasses
        cancelEditSchoolClass()
    }

    function saveSchoolClass() {
        if(tmpSchoolClassIndex != null)
            saveExistingSchoolClass()
        else
            saveNewSchoolClass(tmpSchoolClass, schoolClasses)
    }

    function classAlreadyExists(tmpSchoolClass: SchoolClassFormData | null, schoolClasses: SchoolClass[]): boolean{
        let exists = false
        schoolClasses.forEach(schoolClass => {
            if (schoolClass.section.value == tmpSchoolClass!._section.value && schoolClass.track?.value == (tmpSchoolClass!._track.value.toUpperCase() || undefined))
                exists = true
        })

        return exists
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
            {#each schoolClasses as schoolClass, index}
                {#if tmpSchoolClassIndex != index}
                    <tr>
                        <td>{schoolClass.year}</td>
                        <td>{schoolClass.section}</td>
                        <td>{schoolClass.track || "-"}</td>
                        
                        <td>
                            <Button
                                color="primary"
                                on:click={() => editSchoolClass(schoolClass)}>
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
