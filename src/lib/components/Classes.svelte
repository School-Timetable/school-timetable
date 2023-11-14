<script lang="ts">
    import {SchoolClass} from "$model/school-class/school-class";
    import {Button, ButtonGroup, Col, Container, Form, Icon, Input, Label, Row,} from "sveltestrap";
    import {Track} from "$model/school-class/track";
    import {ZodError} from "zod";
    import { slide } from "svelte/transition";
    import {linear} from "svelte/easing";
    import ClassFormRow from "$lib/components/ClassFormRow.svelte";


    let schoolClassTemplate = SchoolClass.of(1, "A");
    let schoolClass = SchoolClass.of(2, "D");
	let schoolClass2 = SchoolClass.of(4, "C", "Scientifico");

    let options = {duration: 200 ,easing: linear};

    // TODO: check
    let schoolClasses = [schoolClass, schoolClass2]

    // TODO: set schoolClasses from db

	let tmpSchoolClassIndex: number | null = null;
	let tmpSchoolClass: SchoolClassFormData | null = null;

	type SchoolClassFormData = {
		_year: { value: number };
		_section: { value: string };
		_track: { value: string };
	};

	function editSchoolClass(index: number) {
        tmpSchoolClassIndex = index
        schoolClasses = schoolClasses
	}

    function addSchoolClass() {
        tmpSchoolClass = {
            _year: { value: schoolClass.year.value },
            _section: { value: schoolClass.section.value },
            _track: { value: schoolClass.track?.value || "" }
        };
        schoolClasses = schoolClasses;
        tmpSchoolClassIndex = schoolClasses.length
    }
	const createSchoolClass = (event: { detail: any }) => {
        const newClass = event.detail.schoolClass
        if (classAlreadyExists(newClass, schoolClasses)) {
            alert("Class already exists")
            return
        }
        schoolClasses = [
            ...schoolClasses,
            newClass
        ]

        tmpSchoolClassIndex = null
    }


    const saveSchoolClass = (event: { detail: any }, index: number) => {
        schoolClasses[index] = event.detail.schoolClass
        tmpSchoolClassIndex = null
    }

    function classAlreadyExists(schoolClass: SchoolClass, schoolClasses: SchoolClass[]): boolean{
        let exists = false
        schoolClasses.forEach((sc) => {
            if (sc.year.value === schoolClass.year.value && sc.section.value === schoolClass.section.value && sc.track?.value === schoolClass.track?.value) {
                exists = true
            }
        })

        return exists
    }

</script>

<Form>
    <Container>
        <Row>
            <Col sm={{size: 2}}>Year</Col>
            <Col sm={{size: 2}}><strong>Section</strong></Col>
            <Col sm={{size: 8}}><strong>Track</strong></Col>
        </Row>
        {#each schoolClasses as schoolClass, index}
            <div class="row" transition:slide|local={{...options}}>
                {#if tmpSchoolClassIndex !== index}
                    <Col sm={{size: 2}}>{schoolClass.year.value}</Col>
                    <Col sm={{size: 2}}>{schoolClass.section.value}</Col>
                    <Col sm={{size: 5}}>{schoolClass.track?.value || "-"}</Col>
                    <Col sm={{size: 3}}>
                        <Button color="primary" on:click={() => editSchoolClass(index)}>
                            <Icon name="pencil-square" /> Edit
                        </Button>
                        <Button color="danger" on:click={() => {schoolClasses.splice(index,1); schoolClasses = schoolClasses}}>
                            <Icon name="trash-fill"/> Delete
                        </Button>
                    </Col>
                {:else}
                    <div class="row" transition:slide|local={{...options}}>
                        <ClassFormRow {schoolClass}
                                      on:cancel={() => tmpSchoolClassIndex = null}
                                      on:save={(e) => {saveSchoolClass(e,index)}}/>
                    </div>
                {/if}
            </div>
        {/each}
        {#if tmpSchoolClassIndex === schoolClasses.length}
            <div class="row" transition:slide|local={{...options}}>
                <ClassFormRow on:cancel={() => {tmpSchoolClassIndex = null}}
                              on:save={createSchoolClass}/>

            </div>
        {/if}
        <Row>
            <div class="col-12 text-center">
                <Button color="primary" on:click={() => addSchoolClass()}><Icon name="plus" />Add</Button>
            </div>
        </Row>
	</Container>
</Form>
